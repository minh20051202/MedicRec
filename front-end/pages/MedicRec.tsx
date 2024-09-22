"use client";

import React, { useContext } from "react";
import Link from "next/link";
import {
  SmartContractContextType,
  UpdateFields,
} from "../types/contexts/SmartContractContextType";
import SmartContractContext from "../contexts/components/SmartContractContext";
import { LucidContextType } from "../types/contexts/LucidContextType";
import LucidContext from "../contexts/components/LucidContext";
import { WalletContextType } from "../types/contexts/WalletContextType";
import WalletContext from "../contexts/components/WalletContext";
import { uploadImageToIPFS } from "../utils/patient/IPFSPinningAndRetrieving";
import styles from "./MedicRec.module.css"; // Import styles as a module

type Props = {};

const MedicRec = function ({}: Props) {
  const {
    CIP68NFT,
    mintNFT,
    updateNFT,
    mintTxHash,
    updateTxHash,
    waitingMintTx,
    waitingUpdateTx,
  } = useContext<SmartContractContextType>(SmartContractContext);
  const { lucid } = useContext<LucidContextType>(LucidContext);
  const { connect } = useContext<WalletContextType>(WalletContext);

  return (
    <div className={styles["medic-rec-container"]}>
      <div className={styles["medic-rec-form-container"]}>
        {!lucid && (
          <div className={styles["medic-rec-connect-button"]}>
            <button onClick={connect}>Connect Wallet</button>
          </div>
        )}

        {lucid && (
          <div>
            <h2 className={styles["medic-rec-title"]}>
              Mint And Update Your Dynamic NFT
            </h2>
            <form
              encType="multipart/form-data"
              className={styles["medic-rec-form"]}
            >
              <input
                type="text"
                className={styles["medic-rec-input"]}
                placeholder="Name"
                id="name"
                required
              />

              <input
                type="file"
                id="image-upload"
                className={styles["medic-rec-input"]}
                accept="image/*"
                required
              />

              <select
                className={styles["medic-rec-input"]}
                id="media-type"
                required
              >
                <option value="image/png">image/png</option>
                <option value="image/jpg">image/jpg</option>
                <option value="image/jpeg">image/jpeg</option>
              </select>
              <input
                type="text"
                id="patient-info-url"
                className={styles["medic-rec-input"]}
                placeholder="Patient Info URL"
                required
              />
              <textarea
                id="description"
                className={styles["medic-rec-input"]}
                placeholder="Description"
                required
              ></textarea>
              <button
                className={styles["medic-rec-button"]}
                onClick={async (e) => {
                  e.preventDefault(); // Prevent default form submission
                  const fileInput = document.getElementById(
                    "image-upload"
                  ) as HTMLInputElement;
                  const file = fileInput.files ? fileInput.files[0] : null;

                  if (file) {
                    try {
                      const ipfsImageUrl = await uploadImageToIPFS(file);
                      const patientMetaData = {
                        name: (
                          document.getElementById("name") as HTMLInputElement
                        ).value,
                        image: ipfsImageUrl,
                        mediaType: (
                          document.getElementById(
                            "media-type"
                          ) as HTMLSelectElement
                        ).value,
                        description: (
                          document.getElementById(
                            "description"
                          ) as HTMLTextAreaElement
                        ).value,
                        patientInfoUrl: (
                          document.getElementById(
                            "patient-info-url"
                          ) as HTMLInputElement
                        ).value,
                      };
                      mintNFT(patientMetaData);
                    } catch (error) {
                      console.error("Error during minting:", error);
                    }
                  } else {
                    alert("Please upload an image.");
                  }
                }}
                disabled={waitingMintTx || !!mintTxHash}
              >
                {waitingMintTx ? "Waiting for Tx..." : "Mint NFT"}
              </button>
            </form>

            {mintTxHash && CIP68NFT && (
              <div className={styles["nft-result-section"]}>
                <h3 className={styles["nft-result-title"]}>NFT Minted</h3>
                <p className={styles["nft-result-label"]}>Transaction Hash:</p>
                <p className={styles["nft-result-value"]}>{mintTxHash}</p>
                <p className={styles["nft-result-label"]}>CIP68NFT:</p>
                <p className={styles["nft-result-value"]}>{CIP68NFT}</p>
                <form
                  encType="multipart/form-data"
                  className={styles["medic-rec-form"]}
                >
                  <input
                    type="text"
                    className={styles["medic-rec-input"]}
                    placeholder="CIP68NFT"
                    id="CIP68NFT"
                    required
                  />
                  <label htmlFor="image-upload2">Upload Image:</label>
                  <input
                    type="file"
                    id="image-upload2"
                    className={styles["medic-rec-input"]}
                    accept="image/*"
                  />
                  <label htmlFor="media-type2">Media Type</label>
                  <select
                    className={styles["medic-rec-input"]}
                    id="media-type2"
                  >
                    <option value="image/png">image/png</option>
                    <option value="image/jpg">image/jpg</option>
                    <option value="image/jpeg">image/jpeg</option>
                  </select>
                  <input
                    type="text"
                    id="patient-info-url2"
                    className={styles["medic-rec-input"]}
                    placeholder="Patient Info URL"
                  />
                  <textarea
                    id="description2"
                    className={styles["medic-rec-input"]}
                    placeholder="Description"
                    required
                  ></textarea>
                  <button
                    className={styles["medic-rec-button"]}
                    onClick={async (e) => {
                      e.preventDefault(); // Prevent default form submission
                      const CIP68NFT = (
                        document.getElementById("CIP68NFT") as HTMLInputElement
                      ).value;
                      const fileInput = document.getElementById(
                        "image-upload2"
                      ) as HTMLInputElement;
                      const file = fileInput.files ? fileInput.files[0] : null;

                      if (file) {
                        try {
                          const ipfsImageUrl = await uploadImageToIPFS(file);
                          const updateFields: UpdateFields = {
                            image: ipfsImageUrl,
                            mediaType: (
                              document.getElementById(
                                "media-type2"
                              ) as HTMLSelectElement
                            ).value,
                            description: (
                              document.getElementById(
                                "description2"
                              ) as HTMLTextAreaElement
                            ).value,
                            patientInfoUrl: (
                              document.getElementById(
                                "patient-info-url2"
                              ) as HTMLInputElement
                            ).value,
                          };
                          updateNFT(CIP68NFT, updateFields);
                        } catch (error) {
                          console.error("Error during updating:", error);
                        }
                      }
                    }}
                    disabled={waitingUpdateTx || !!updateTxHash}
                  >
                    {waitingUpdateTx ? "Waiting for Tx..." : "Update NFT"}
                  </button>
                </form>
              </div>
            )}
            {updateTxHash && (
              <>
                <div className={styles["nft-result-section"]}>
                  <h3 className={styles["nft-result-title"]}>NFT Updated</h3>

                  <Link
                    target="_blank"
                    href={`https://preprod.cardanoscan.io/transaction/${updateTxHash}`}
                  >
                    <p className={styles["nft-result-label"]}>
                      Transaction Hash:
                    </p>
                    <p className={styles["nft-result-value"]}>{updateTxHash}</p>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicRec;
