import { Lucid } from "lucid-cardano";

export type SmartContractContextType = {
  waitingMintTx: boolean;
  waitingUpdateTx: boolean;
  mintTxHash: string;
  updateTxHash: string;
  mintNFT: ({ patientMetaData }: { patientMetaData: Object }) => Promise<void>;
  updateNFT: ({
    CIP68NFT,
    updateFields,
  }: {
    CIP68NFT: string;
    updateFields: any;
  }) => Promise<void>;
};
