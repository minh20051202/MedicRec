import { Lucid } from "lucid-cardano";

export type UpdateFields = {
  image: string;
  mediaType: string;
  description: string;
  patientInfoUrl: string;
};

export type SmartContractContextType = {
  waitingMintTx: boolean;
  waitingUpdateTx: boolean;
  mintTxHash: string;
  updateTxHash: string;
  CIP68NFT: string;
  mintNFT: (object) => Promise<void>;
  updateNFT: (CIP68NFT: string, updateFields: UpdateFields) => Promise<void>;
};
