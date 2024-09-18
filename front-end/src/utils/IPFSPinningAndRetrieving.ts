import { PinataSDK } from "pinata";
import "dotenv/config";
import fetch from "node-fetch";
const pinata = new PinataSDK({
  pinataJwt: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMzYxMDQ3Ny0zN2JlLTQzOGUtODdiMy03ZDY5YjhlNmE4ZGIiLCJlbWFpbCI6Im1pbmgyMDA1MTIwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWJmNDllNTA5MzkxMWFhY2ZhZTEiLCJzY29wZWRLZXlTZWNyZXQiOiJjZjIwYTk5MmVhZjhiN2IwOGY0ZmM4OGM1MGQyNmExZDFkZWEyN2VhMWQyNTJmZjE1ZmU4MjI3ODVkYWVhMDk2IiwiZXhwIjoxNzU3MDY0MTA3fQ.atTL-p4abwZA1MKdOv7ecu6SibE8Xcwqr237temf-vM`,
  pinataGateway: `silver-selective-gull-985.mypinata.cloud`,
});

async function uploadToIPFS(
  encryptedResourceData: string,
  resourceType: string
) {
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

async function retrieveFromIPFS(signedURL: string) {
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
