import { Network } from "https://deno.land/x/lucid@0.10.7/mod.ts";
export const NETWORK: Network = "Preprod";

export const BLOCKFROST_URL = "https://cardano-preprod.blockfrost.io/api/v0";
export const BLOCKFROST_API_KEY = "preprodh3jIigZGB80cyTy7528a6Q3n1yR8NUwT";

// Paths
export const PROJECT_PATH =
  "/home/0xKaBG/Project/cardano-hackathon/MedicRec/MedicRec/aiken-workspace/";
export const CREDENTIALS_PATH = PROJECT_PATH + "wallets/";
export const APPLIED_VALIDATOR_PATH = PROJECT_PATH + "applied-validators/";

// Asset Labels
export const REFERENCE_TOKEN_LABEL = 100;
export const NON_FUNGIBLE_TOKEN_LABEL = 222;
export const FUNGIBLE_TOKEN_LABEL = 333;
