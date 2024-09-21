"use client";
import type { UpdateFields } from "../../types/contexts/SmartContractContextType";
import React, { ReactNode, useState } from "react";
import {
  createLucidInstance,
  getUtxoWithAssets,
  getPublicKeyHash,
} from "../../utils/lucid/utils.ts";
import {
  NON_FUNGIBLE_TOKEN_LABEL,
  REFERENCE_TOKEN_LABEL,
  MINT_MINT_JSON,
  REFERENCE_STORE_JSON,
  ISSUER_ADDR,
  ISSUER_SK,
} from "../../common/constants.ts";
import { MetaDatum, AppliedValidator } from "../../common/types.ts";
import {
  Data,
  Constr,
  fromText,
  toUnit,
  toHex,
  fromHex,
  UTxO,
} from "lucid-cardano";
import SmartContractContext from "../../contexts/components/SmartContractContext.ts";
type Props = {
  children: ReactNode;
};
import sha3 from "js-sha3";

const SmartContractProvider = function ({ children }: Props) {
  const [CIP68NFT, setCIP68NFT] = useState<string>("");
  const [mintTxHash, setMintTxHash] = useState<string>("");
  const [waitingMintTx, setWaitingMintTx] = useState<boolean>(false);
  const [updateTxHash, setUpdateTxHash] = useState<string>("");
  const [waitingUpdateTx, setWaitingUpdateTx] = useState<boolean>(false);
  const mintNFT = async function (patientMetaData: any): Promise<void> {
    try {
      setWaitingMintTx(true);
      const lucid = await createLucidInstance();

      lucid.selectWalletFromPrivateKey(ISSUER_SK);

      const issuerAddr = ISSUER_ADDR;

      const api = await window.cardano.eternl.enable();

      lucid.selectWallet(api);

      const userAddr = await lucid.wallet.address();

      const userUtxos = await lucid.utxosAt(userAddr);

      if (!userUtxos || !userUtxos.length) {
        console.error("No UTxO found at user address: " + userAddr);
      }

      const selectedUtxo = getUtxoWithAssets(userUtxos, {
        ["lovelace"]: 10000000n,
      });

      const assetNameSuffix = await getUniqueAssetNameSuffix(selectedUtxo);

      const mintValidator: AppliedValidator = JSON.parse(MINT_MINT_JSON);

      const storeValidator: AppliedValidator = JSON.parse(REFERENCE_STORE_JSON);

      const refNFT = toUnit(
        mintValidator.policyId,
        assetNameSuffix,
        REFERENCE_TOKEN_LABEL
      );

      const userNFT = toUnit(
        mintValidator.policyId,
        assetNameSuffix,
        NON_FUNGIBLE_TOKEN_LABEL
      );

      const mintRdmr = Data.to(new Constr(0, []));

      const metadata = Data.fromJson(patientMetaData);
      const version = 1n;
      const extra = Data.void();

      const metadatum = Data.to(new Constr(0, [metadata, version, extra]));

      const tx = await lucid
        .newTx()
        .collectFrom([selectedUtxo])
        .mintAssets({ [userNFT]: 1n, [refNFT]: 1n }, mintRdmr)
        .attachMintingPolicy(mintValidator.validator)
        .payToAddress(userAddr, { [userNFT]: 1n })
        .payToContract(
          storeValidator.lockAddress,
          { inline: metadatum },
          {
            [refNFT]: 1n,
          }
        )
        .addSigner(issuerAddr)
        .addSigner(userAddr)
        .validFrom(Date.now() - 60 * 1000)
        .validTo(Date.now() + 15 * 60 * 1000)
        .complete({
          change: { address: userAddr },
          coinSelection: false,
        });

      lucid.selectWalletFromPrivateKey(ISSUER_SK);

      const partialSignedTx = await tx.partialSign();

      lucid.selectWallet(api);

      const signedTx = await lucid
        .fromTx(tx.toString())
        .assemble([partialSignedTx])
        .sign()
        .complete();

      const txHash = await signedTx.submit();
      await lucid.awaitTx(txHash);

      console.log(
        `Successfully minted CIP-68 NFT: ${userNFT},
    Ref NFT: ${refNFT},
    storeAddress: ${storeValidator.lockAddress},
    to userAddress: ${userAddr},
    Policy Id: ${mintValidator.policyId},
    txHash: ${txHash}`
      );
      setCIP68NFT(userNFT);
      setMintTxHash(txHash);
    } catch (error) {
      console.log(error);
    } finally {
      setWaitingMintTx(false);
    }
  };

  const updateNFT = async function (
    CIP68NFT: string,
    updateFields: UpdateFields
  ): Promise<void> {
    try {
      setWaitingUpdateTx(true);
      const lucid = await createLucidInstance();

      lucid.selectWalletFromPrivateKey(ISSUER_SK);

      const mintValidator: AppliedValidator = JSON.parse(MINT_MINT_JSON);

      const storeValidator: AppliedValidator = JSON.parse(REFERENCE_STORE_JSON);
      const storeUtxos = await lucid.utxosAt(storeValidator.lockAddress);

      const assetNameSuffix = CIP68NFT.substring(64, CIP68NFT.length);
      const refToken = toUnit(
        mintValidator.policyId,
        assetNameSuffix,
        REFERENCE_TOKEN_LABEL
      );

      const refUtxo = getUtxoWithAssets(storeUtxos, { [refToken]: 1n });

      let metaDatum: MetaDatum;

      try {
        metaDatum = Data.from<MetaDatum>(refUtxo.datum!, MetaDatum);
        const metadata = metaDatum?.metadata;

        if (updateFields.image !== "" && updateFields.image !== undefined) {
          metadata?.set(fromText("image"), fromText(updateFields.image));
        }

        if (
          updateFields.mediaType !== "" &&
          updateFields.mediaType !== undefined
        ) {
          metadata?.set(
            fromText("mediaType"),
            fromText(updateFields.mediaType)
          );
        }

        if (
          updateFields.description !== "" &&
          updateFields.description !== undefined
        ) {
          metadata?.set(
            fromText("description"),
            fromText(updateFields.description)
          );
          console.log(metadata?.get(fromText("description")));
        }

        if (
          updateFields.patientInfoUrl !== "" &&
          updateFields.patientInfoUrl !== undefined
        ) {
          metadata?.set(
            fromText("patientInfoUrl"),
            fromText(updateFields.patientInfoUrl)
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `Error occurred while deserializing UTxO datum at refToken(${refToken}) to MetaDatum. 
            Datum: ${refUtxo.datum}. Error: ${error.message}`
          );
        } else {
          console.error(
            `Error occurred while deserializing UTxO datum at refToken(${refToken}) to MetaDatum. 
            Datum: ${refUtxo.datum}. Error: ${String(error)}`
          );
        }
      }

      const rdmr = Data.to(new Constr(0, []));

      const tx = await lucid
        .newTx()
        .collectFrom([refUtxo], rdmr)
        .payToContract(
          storeValidator.lockAddress,
          {
            inline: Data.to<MetaDatum>(metaDatum!, MetaDatum),
          },
          { [refToken]: 1n }
        )
        .attachSpendingValidator(storeValidator.validator)
        .addSigner(await lucid.wallet.address())
        .complete();

      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();

      console.log(
        `Successfully updated CIP-68 Reference NFT: ${refToken},
    storeAddress: ${storeValidator.lockAddress},
    token: ${mintValidator.policyId},
    txHash: ${txHash}`
      );
      setUpdateTxHash(txHash);
    } catch (error) {
      console.log(error);
    } finally {
      setWaitingUpdateTx(false);
    }
  };

  return (
    <SmartContractContext.Provider
      value={{
        CIP68NFT,
        mintTxHash,
        updateTxHash,
        waitingMintTx,
        waitingUpdateTx,
        mintNFT,
        updateNFT,
      }}
    >
      {children}
    </SmartContractContext.Provider>
  );
};

async function getUniqueAssetNameSuffix(utxo: UTxO): Promise<string> {
  // Convert the transaction hash to a Uint8Array and compute the SHA3-256 hash
  const hashBuffer = sha3.sha3_256.arrayBuffer(fromHex(utxo.txHash));

  // Convert the buffer to a Uint8Array
  const hash = new Uint8Array(hashBuffer);

  // Return the asset name suffix by combining the output index and the first 27 bytes of the hash
  return toHex(new Uint8Array([utxo.outputIndex])) + toHex(hash.slice(0, 27));
}

export default SmartContractProvider;
