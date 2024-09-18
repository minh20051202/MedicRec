import {
  Constr,
  Data,
  fromHex,
  toHex,
  toUnit,
  UTxO,
} from "https://deno.land/x/lucid@0.10.7/mod.ts";
import {
  createLucidInstance,
  getCredential,
  getUtxoWithAssets,
} from "./utils/lucid/utils.js";
import { crypto } from "https://deno.land/std@0.201.0/crypto/mod.ts";
import {
  APPLIED_VALIDATOR_PATH,
  NON_FUNGIBLE_TOKEN_LABEL,
  REFERENCE_TOKEN_LABEL,
} from "./common/constants.js";
import { AppliedValidator } from "./common/types.js";

export async function mintNFT(patientMetaData: any) {
  const lucid = await createLucidInstance();

  lucid.selectWalletFromPrivateKey(await getCredential("issuer.sk"));

  const issuerAddr = await getCredential("issuer.addr");
  const userAddr = await getCredential("user.addr");
  const userUtxos = await lucid.utxosAt(userAddr);

  if (!userUtxos || !userUtxos.length) {
    console.error("No UTxO found at user address: " + userAddr);
  }

  const selectedUtxo = getUtxoWithAssets(userUtxos, { ["lovelace"]: 5000000n });

  const assetNameSuffix = await getUniqueAssetNameSuffix(selectedUtxo);

  const mintValidator: AppliedValidator = JSON.parse(
    await Deno.readTextFile(APPLIED_VALIDATOR_PATH + "mint.mint.json")
  );

  const storeValidator: AppliedValidator = JSON.parse(
    await Deno.readTextFile(
      APPLIED_VALIDATOR_PATH + "reference_store.store.json"
    )
  );

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

  const partialSignedTx = await tx.partialSign();

  lucid.selectWalletFromPrivateKey(await getCredential("user.sk"));

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
}

async function getUniqueAssetNameSuffix(utxo: UTxO): Promise<string> {
  const hash = new Uint8Array(
    await crypto.subtle.digest("SHA3-256", fromHex(utxo.txHash))
  );
  return toHex(new Uint8Array([utxo.outputIndex])) + toHex(hash.slice(0, 27));
}

// async function submitNFTCreationForm() {
//   const formData = {
//     name: (document.getElementById("name") as HTMLInputElement).value,
//     image: (document.getElementById("image") as HTMLInputElement).value,
//     mediaType: (document.getElementById("mediaType") as HTMLInputElement).value,
//     description: (document.getElementById("description") as HTMLTextAreaElement)
//       .value,
//     patientInfoUrl: (document.getElementById("patientInfoUrl") as HTMLTextAreaElement)
//       .value,
//   };

//   await mintNFT(formData);
// }

// const metadata = JSON.parse(`{
//   "name": "Nguyen Tuan Minh",
//   "image": "ipfs://QmcjXZALDe3Evn5Uw4bStzGiDLweiEGUf9V5QZ8VXHY2RZ",
//   "mediaType": "image/png",
//   "description": "Nguyen Tuan Minh's bundle resources",
//   "patientInfoUrl": "https://silver-selective-gull-985.mypinata.cloud/files/bafkreihh3zq4rnt3y2haykfrtbhb2jqrpxhs6u4natousnwtt5ndl5dfcm?X-Algorithm=PINATA1&X-Date=1726478297&X-Expires=999999999999999&X-Method=GET&X-Signature=21a68743b9b015589a424601f6874df47794550f6193c7e477fd906f361c5039"
// }
// `);
// mintNFT(metadata);
