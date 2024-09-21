"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { SmartContractContextType } from "../../types/contexts/SmartContractContextType";
import SmartContractContext from "../../contexts/components/SmartContractContext";
import { LucidContextType } from "../../types/contexts/LucidContextType";
import LucidContext from "../../contexts/components/LucidContext";
import { WalletContextType } from "../../types/contexts/WalletContextType";
import WalletContext from "../../contexts/components/WalletContext";

type Props = {};

const containerStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f5f5f5",
  textAlign: "center" as const,
  margin: 0,
  padding: 0,
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formContainerStyle = {
  backgroundColor: "#fdf0c9",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  width: "300px",
};

const inputFieldStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const MedicRec = function ({}: Props) {
  const {
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
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        {!lucid && (
          <div className="mt-10 grid grid-cols-1 gap-y-8">
            <button
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
              onClick={connect}
            >
              Connect Wallet
            </button>
          </div>
        )}

        {lucid && (
          <div>
            <div className="mt-10 grid grid-cols-1 gap-y-8">
              <form encType="multipart/form-data">
                <input
                  type="text"
                  style={inputFieldStyle}
                  placeholder="Name"
                  id="name"
                  required
                />
                <br />
                <br />

                <label htmlFor="image-upload">Upload Image:</label>
                <input
                  type="file"
                  id="image-upload"
                  style={inputFieldStyle}
                  accept="image/*"
                  required
                />
                <br />
                <br />

                <label htmlFor="media-type">Media Type</label>
                <select style={inputFieldStyle} id="media-type" required>
                  <option value="image/png">image/png</option>
                  <option value="image/jpg">image/jpg</option>
                  <option value="image/jpeg">image/jpeg</option>
                </select>
                <br />
                <br />

                <input
                  type="text"
                  id="patient-info-url"
                  style={inputFieldStyle}
                  placeholder="Patient Info URL"
                  required
                />
                <br />
                <br />

                <textarea
                  id="description"
                  style={inputFieldStyle}
                  placeholder="Description"
                ></textarea>
                <br />
                <br />
              </form>
              <button
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                onClick={() => {
                  const patientMetaData = {
                    name: (document.getElementById("name") as HTMLInputElement)
                      .value,
                    image: (
                      document.getElementById(
                        "image-upload"
                      ) as HTMLInputElement
                    ).value,
                    mediaType: (
                      document.getElementById("media-type") as HTMLInputElement
                    ).value,
                    description: (
                      document.getElementById(
                        "description"
                      ) as HTMLTextAreaElement
                    ).value,
                    patientInfoUrl: (
                      document.getElementById(
                        "patient-info-url"
                      ) as HTMLTextAreaElement
                    ).value,
                  };
                  console.log(patientMetaData.image);
                  mintNFT({ patientMetaData });
                }}
                disabled={waitingMintTx || !!mintTxHash}
              >
                {waitingMintTx ? "Waiting for Tx..." : "Mint NFT"}
              </button>

              {mintTxHash && (
                <div className="mt-10 grid grid-cols-1 gap-y-8">
                  <h3 className="mt-4 mb-2">NFT minted</h3>
                  <Link
                    className="mb-2"
                    target="_blank"
                    href={`https://preprod.cardanoscan.io/transaction/${mintTxHash}`}
                  >
                    {mintTxHash}
                  </Link>
                  <button
                    className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-800 active:text-blue-100"
                    onClick={() => {
                      const CIP68NFT = (
                        document.getElementById(
                          "CIP68NFT"
                        ) as HTMLTextAreaElement
                      ).value;
                      const updateFields = {
                        name: (
                          document.getElementById("name") as HTMLInputElement
                        ).value,
                        image: (
                          document.getElementById("image") as HTMLInputElement
                        ).value,
                        mediaType: (
                          document.getElementById(
                            "mediaType"
                          ) as HTMLInputElement
                        ).value,
                        description: (
                          document.getElementById(
                            "description"
                          ) as HTMLTextAreaElement
                        ).value,
                        patientInfoUrl: (
                          document.getElementById(
                            "patientInfoUrl"
                          ) as HTMLTextAreaElement
                        ).value,
                      };

                      updateNFT({ CIP68NFT, updateFields });
                    }}
                    disabled={waitingUpdateTx || !!updateTxHash}
                  >
                    {waitingUpdateTx ? "Waiting for Tx..." : "Update NFT"}
                  </button>
                </div>
              )}
              {updateTxHash && (
                <>
                  <h3 className="mt-4 mb-2">NFT Updated</h3>
                  <Link
                    className="mb-2"
                    target="_blank"
                    href={`https://preprod.cardanoscan.io/transaction/${updateTxHash}`}
                  >
                    {updateTxHash}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicRec;
