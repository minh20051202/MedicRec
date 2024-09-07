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
    console.log("Your resource CID is: ", upload.cid);
  } catch (error) {
    console.log(error);
  }
}

async function retrieveFromIPFS(cid) {
  try {
    const data = await pinata.gateways.get(`${cid}`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export { uploadToIPFS, retrieveFromIPFS };
