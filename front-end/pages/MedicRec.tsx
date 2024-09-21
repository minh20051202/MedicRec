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

const MedicRec = function () {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {!lucid && (
          <div className="mb-4">
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={connect}
            >
              Connect Wallet
            </button>
          </div>
        )}

        {lucid && (
          <div>
            <form encType="multipart/form-data" className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Name"
                id="name"
                required
              />

              <label htmlFor="image-upload" className="block text-gray-700">
                Upload Image:
              </label>
              <input
                type="file"
                id="image-upload"
                className="w-full p-2 border rounded"
                accept="image/*"
                required
              />

              <label htmlFor="media-type" className="block text-gray-700">
                Media Type
              </label>
              <select
                className="w-full p-2 border rounded"
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
                className="w-full p-2 border rounded"
                placeholder="Patient Info URL"
                required
              />

              <textarea
                id="description"
                className="w-full p-2 border rounded"
                placeholder="Description"
              ></textarea>

              <button
                className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={async (e) => {
                  e.preventDefault(); // Prevent form submission
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
              <div className="mt-6">
                <h3 className="font-semibold mb-2">NFT minted</h3>
                <Link
                  className="text-blue-600"
                  target="_blank"
                  href={`https://preprod.cardanoscan.io/transaction/${mintTxHash}`}
                >
                  {mintTxHash}
                </Link>
                <h3 className="font-semibold mt-4 mb-2">CIP68NFT</h3>
                <div className="border p-2 rounded">{CIP68NFT}</div>

                <form encType="multipart/form-data" className="space-y-4 mt-6">
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="CIP68NFT"
                    id="CIP68NFT"
                    required
                  />

                  <label
                    htmlFor="image-upload2"
                    className="block text-gray-700"
                  >
                    Upload Image:
                  </label>
                  <input
                    type="file"
                    id="image-upload2"
                    className="w-full p-2 border rounded"
                    accept="image/*"
                  />

                  <label htmlFor="media-type2" className="block text-gray-700">
                    Media Type
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    id="media-type2"
                  >
                    <option value="image/png">image/png</option>
                    <option value="image/jpg">image/jpg</option>
                    <option value="image/jpeg">image/jpeg</option>
                  </select>

                  <input
                    type="text"
                    id="patient-info-url2"
                    className="w-full p-2 border rounded"
                    placeholder="Patient Info URL"
                  />

                  <textarea
                    id="description2"
                    className="w-full p-2 border rounded"
                    placeholder="Description"
                    required
                  ></textarea>

                  <button
                    className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={async (e) => {
                      e.preventDefault(); // Prevent form submission
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
              <div className="mt-6">
                <h3 className="font-semibold mb-2">NFT Updated</h3>
                <Link
                  className="text-blue-600"
                  target="_blank"
                  href={`https://preprod.cardanoscan.io/transaction/${updateTxHash}`}
                >
                  {updateTxHash}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicRec;
