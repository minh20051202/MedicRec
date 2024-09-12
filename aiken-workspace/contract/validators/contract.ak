use aiken/builtin
use aiken/collection/list
use aiken/crypto.{Blake2b_224, Hash, ScriptHash, VerificationKeyHash}
use aiken/primitive/bytearray
use cardano/address.{Address}
use cardano/addresses
use cardano/assets.{AssetName, PolicyId, Value}
use cardano/minting
use cardano/script_context.{Minting, ScriptContext, Spending}
use cardano/transaction.{
  InlineDatum, Input, Output, OutputReference, Redeemer, Transaction,
}
use cardano/tx
use types/cip68.{CIP68, prefix_100, prefix_222}
use validation/find
use validation/payout

type POSIXTime =
  Int

type Action {
  Lock
  Mint
  Update
  Unlock
  Burn
  AddAuthorizedUpdater { new_updater: VerificationKeyHash }
  RemoveAuthorizedUpdater { old_updater: VerificationKeyHash }
}

type PatientProfileDatum {
  owner: VerificationKeyHash,
  authorized_updaters: List<VerificationKeyHash>,
  nft_policy_id: PolicyId,
  nft_asset_name: AssetName,
  required_ada: Int,
  metadata: CIP68,
  last_update: POSIXTime,
}

validator contract(cip68_hash: ScriptHash) {
  spend(
    datum_opt: Option<PatientProfileDatum>,
    redeemer: Action,
    ctx: ScriptContext,
    _void: Void,
  ) {
    when ctx.info is {
      Spending { output: output_reference, .. } -> {
        let tx: Transaction = ctx.transaction
        expect Some(this_input) = find_input(tx.inputs, output_reference)
        let this_addr: Address = this_input.output.address
        expect Some(datum) = datum_opt

        when redeemer is {
          Lock ->
            verify_signature(tx, datum.owner) && ensure_nft_at_script(
              tx.outputs,
              this_addr,
              datum,
            )
          Update ->
            verify_any_signature(tx, datum.authorized_updaters) && ensure_valid_update(
              tx.outputs,
              this_addr,
              datum,
            )
          Unlock ->
            verify_signature(tx, datum.owner) && ensure_nft_to_owner(
              tx.outputs,
              datum,
            )
          AddAuthorizedUpdater { new_updater } ->
            verify_signature(tx, datum.owner) && !list.has(
              datum.authorized_updaters,
              new_updater,
            ) && ensure_valid_updater_change(
              tx.outputs,
              this_addr,
              datum,
              list.push(datum.authorized_updaters, new_updater),
            )
          RemoveAuthorizedUpdater { old_updater } ->
            verify_signature(tx, datum.owner) && list.has(
              datum.authorized_updaters,
              old_updater,
            ) && ensure_valid_updater_change(
              tx.outputs,
              this_addr,
              datum,
              list.filter(
                datum.authorized_updaters,
                fn(updater) { updater != old_updater },
              ),
            )
          _ -> False
        }
      }
      _ -> False
    }
  }

  mint(redeemer: Action, ctx: ScriptContext) {
    when ctx.info is {
      Minting(policy_id) -> {
        let tx: Transaction = ctx.transaction
        let mint: Value = tx.mint
        let cip68_addr: Address = address.from_script(cip68_hash)

        when redeemer is {
          Mint -> {
            expect [first_input, ..] = tx.inputs
            let first_index: Int = 0
            let first_tx_hash = first_input.output_reference.transaction_id
            let ref_tkn: AssetName =
              unique_token_name(first_tx_hash, first_index, prefix_100)
            let nft_tkn: AssetName =
              unique_token_name(first_tx_hash, first_index, prefix_222)

            expect Some(cip68_output) =
              find_output_by_address(tx.outputs, cip68_addr)
            expect InlineDatum(_metadata) = cip68_output.datum

            first_index < 256 && assets.quantity_of(mint, policy_id, ref_tkn) == 1 && assets.quantity_of(
              mint,
              policy_id,
              nft_tkn,
            ) == 1 && assets.quantity_of(cip68_output.value, policy_id, ref_tkn) == 1
          }
          Burn ->
            minting.burn_asset_by_prefix(mint, policy_id, prefix_100) && minting.burn_asset_by_prefix(
              mint,
              policy_id,
              prefix_222,
            )
          _ -> False
        }
      }
      _ -> False
    }
  }

  else(_) {
    fail
  }
}

fn verify_signature(tx: Transaction, key: VerificationKeyHash) -> Bool {
  list.has(tx.extra_signatories, key)
}

fn verify_any_signature(
  tx: Transaction,
  keys: List<VerificationKeyHash>,
) -> Bool {
  list.any(keys, fn(key) { verify_signature(tx, key) })
}

fn find_input(
  inputs: List<Input>,
  output_reference: OutputReference,
) -> Option<Input> {
  list.find(inputs, fn(input) { input.output_reference == output_reference })
}

fn find_output_by_address(
  outputs: List<Output>,
  address: Address,
) -> Option<Output> {
  list.find(outputs, fn(output) { output.address == address })
}

fn ensure_nft_at_script(
  outputs: List<Output>,
  script_address: Address,
  datum: PatientProfileDatum,
) -> Bool {
  when find_output_by_address(outputs, script_address) is {
    Some(output) ->
      assets.quantity_of(
        output.value,
        datum.nft_policy_id,
        datum.nft_asset_name,
      ) == 1
    None -> False
  }
}

fn ensure_valid_update(
  outputs: List<Output>,
  script_address: Address,
  datum: PatientProfileDatum,
) -> Bool {
  when find_output_by_address(outputs, script_address) is {
    Some(output) ->
      assets.quantity_of(
        output.value,
        datum.nft_policy_id,
        datum.nft_asset_name,
      ) == 1 && assets.quantity_of(
        output.value,
        assets.ada_policy_id,
        assets.ada_asset_name,
      ) >= datum.required_ada && when output.datum is {
        InlineDatum(new_datum_data) ->
          if new_datum_data is new_datum: PatientProfileDatum {
            new_datum.metadata != datum.metadata
          } else {
            False
          }
        _ -> False
      }
    None -> False
  }
}

fn ensure_nft_to_owner(
  outputs: List<Output>,
  datum: PatientProfileDatum,
) -> Bool {
  let owner_address = address.from_verification_key(datum.owner)
  when find_output_by_address(outputs, owner_address) is {
    Some(output) ->
      assets.quantity_of(
        output.value,
        datum.nft_policy_id,
        datum.nft_asset_name,
      ) == 1
    None -> False
  }
}

fn ensure_valid_updater_change(
  outputs: List<Output>,
  script_address: Address,
  datum: PatientProfileDatum,
  new_updaters: List<VerificationKeyHash>,
) -> Bool {
  when find_output_by_address(outputs, script_address) is {
    Some(output) ->
      assets.quantity_of(
        output.value,
        datum.nft_policy_id,
        datum.nft_asset_name,
      ) == 1 && when output.datum is {
        InlineDatum(new_datum_data) ->
          if new_datum_data is new_datum: PatientProfileDatum {
            new_datum.authorized_updaters == new_updaters
          } else {
            False
          }
        _ -> False
      }
    None -> False
  }
}

fn unique_token_name(
  tx_hash: Hash<Blake2b_224, Transaction>,
  index: Int,
  prefix: ByteArray,
) -> AssetName {
  bytearray.concat(
    prefix,
    bytearray.concat(tx_hash, bytearray.from_int_big_endian(index, 4)),
  )
}
