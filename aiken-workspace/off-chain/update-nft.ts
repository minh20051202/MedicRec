import {
  Constr,
  Data,
  fromText,
  toUnit,
} from "https://deno.land/x/lucid@0.10.7/mod.ts";
import {
  createLucidInstance,
  getAppliedValidator,
  getCredential,
  getUtxoWithAssets,
} from "./utils/lucid/utils.ts";
import { REFERENCE_TOKEN_LABEL } from "./common/constants.ts";
import { MetaDatum } from "./common/types.ts";

export async function updateNFT(CIP68NFT: string, updateFields: any) {
  const lucid = await createLucidInstance();
  lucid.selectWalletFromPrivateKey(await getCredential("issuer.sk"));

  const storeValidator = await getAppliedValidator(
    "reference_store.store.json"
  );
  const storeUtxos = await lucid.utxosAt(storeValidator.lockAddress);
  const mintValidator = await getAppliedValidator("mint.mint.json");

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

    // Update fields as per provided updateFields object
    if (updateFields.name !== "" && updateFields.name !== undefined) {
      metadata?.set(fromText("name"), fromText(updateFields.name));
    }

    if (updateFields.image !== "" && updateFields.image !== undefined) {
      metadata?.set(fromText("image"), fromText(updateFields.image));
    }

    if (updateFields.mediaType !== "" && updateFields.mediaType !== undefined) {
      metadata?.set(fromText("mediaType"), fromText(updateFields.mediaType));
    }

    if (
      updateFields.description !== "" &&
      updateFields.description !== undefined
    ) {
      metadata?.set(
        fromText("description"),
        fromText(updateFields.description)
      );
    }

    if (
      updateFields.resourceURL !== "" &&
      updateFields.resourceURL !== undefined
    ) {
      metadata?.set(
        fromText("resourceURL"),
        fromText(updateFields.resourceURL)
      );
    }
  } catch (error) {
    console.error(
      `Error occurred while deserializing UTxO datum at refToken(${refToken}) to MetaDatum. 
      Datum: ${refUtxo.datum}. Error: ${error.message}`
    );
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
}

// async function testUpdateNFT() {
//   // Hardcoded test data
//   const testUpdateFields = {
//     name: "",
//     description: "nai sừ",
//     image: "",
//     mediaType: "",
//     resourceURL:
//       "https://silver-selective-gull-985.mypinata.cloud/files/bafkreig6oho7nw6wopirrzn6wdr43v6ej5xttkispjcrq4lyrqr7zpcdwm?X-Algorithm=PINATA1&X-Date=1726496770&X-Expires=999999999999999&X-Method=GET&X-Signature=54755885d61e4784cb7008a4967ec3063aed3db320a1653f145b5087c6579acb",
//   };

//   // Call the updateNFT function with the test data
//   await updateNFT(
//     "1b1ef2d58718ad4f9cfbda8082a32119b246d19babf9c399ff2d425d000de14002c4209ba00a254cbb120a24ce75d3ab7a59b8b0fbe892072d267e7a",
//     testUpdateFields
//   );
// }

// // Execute the test function
// testUpdateNFT();

// // function updateNFTFromUserInput() {
// //   const formData = {
// //     name: (document.getElementById("name") as HTMLInputElement)?.value,
// //     image: (document.getElementById("image") as HTMLInputElement)?.value,
// //     mediaType: (document.getElementById("mediaType") as HTMLInputElement)?.value,
// //     description: (document.getElementById("description") as HTMLTextAreaElement)
// //       ?.value,
// //    resourceURL: (document.getElementById("resourceURL") as HTMLInputElement)
// //   };

// //   // Call the updateNFT function with the desired update fields
// //   updateNFT("1b1ef2d58718ad4f9cfbda8082a32119b246d19babf9c399ff2d425d000de140020f34d8a77d9742d378373b17db24c876383201ed152839251fdd03","formData");
// // }
