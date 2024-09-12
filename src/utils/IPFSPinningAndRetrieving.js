import { PinataSDK } from "pinata";
import "dotenv/config";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
});

async function uploadToIPFS(encryptedResourceData, resourceType) {
  try {
    const file = new File(
      [`${encryptedResourceData}`],
      `${resourceType}Hash.txt`,
      {
        type: "text/plain",
      }
    );
    const upload = await pinata.upload.file(file);
    const url = await pinata.gateways.createSignedURL({
      cid: upload.cid,
      expires: 999999999999999,
    });
    return url;
  } catch (error) {
    console.log(error);
  }
}

async function retrieveFromIPFS(signedURL) {
  try {
    const response = await fetch(`${signedURL}`);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const retrievedData = await response.text();
    return retrievedData;
  } catch (error) {
    console.log(error);
  }
}

export { uploadToIPFS, retrieveFromIPFS };
