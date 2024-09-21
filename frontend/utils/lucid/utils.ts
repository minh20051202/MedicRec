import {
  BLOCKFROST_API_KEY,
  BLOCKFROST_URL,
  NETWORK,
} from "../../common/constants.ts";

import {
  addAssets,
  Assets,
  Blockfrost,
  Lucid,
  Network,
  Provider,
  UTxO,
} from "lucid-cardano";

const lucid = await Lucid.new(undefined, NETWORK);

export async function createLucidInstance(
  provider?: Provider,
  network?: Network
) {
  let defaultNetwork = NETWORK;
  let defaultProvider: Provider = new Blockfrost(
    BLOCKFROST_URL,
    BLOCKFROST_API_KEY
  );

  if (provider) {
    defaultProvider = provider;
  }
  if (network) {
    defaultNetwork = network;
  }

  return await Lucid.new(defaultProvider, defaultNetwork);
}

// Credentials related utilities

export function getPublicKeyHash(address: string) {
  return lucid.utils.getAddressDetails(address).paymentCredential?.hash!;
}

// UTxOs related utilities

export function sumUtxos(utxos: UTxO[]): Assets {
  return utxos
    .map((utxo) => utxo.assets)
    .reduce((acc, assets) => addAssets(acc, assets), {});
}

/// Returns the first UTxO containing equal to or greater than the asset value provided
export function getUtxoWithAssets(utxos: UTxO[], minAssets: Assets): UTxO {
  const utxo = utxos.find((utxo) => {
    for (const [unit, value] of Object.entries(minAssets)) {
      if (!Object.hasOwn(utxo.assets, unit) || utxo.assets[unit] < value) {
        return false;
      }
    }
    return true;
  });

  if (!utxo) {
    throw new Error(
      "No UTxO found containing assets: " +
        JSON.stringify(minAssets, bigIntReplacer)
    );
  }
  return utxo;
}

// Parameter to 'JSON.stringify()' to help with bigint conversion
export function bigIntReplacer(_k: any, v: any) {
  return typeof v === "bigint" ? v.toString() : v;
}
