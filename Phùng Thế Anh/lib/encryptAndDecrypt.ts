import CryptoJS from "crypto-js";
function encryptData(data: any, secretKey: any) {
  const encrypted = CryptoJS.AES.encrypt(
    data,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(secretKey),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();
  return encrypted;
}


function decryptData(encryptedData: any, secretKey: string) {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedData,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(secretKey),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  const originalData = decrypted.toString(CryptoJS.enc.Utf8);
  return originalData;
}


export { encryptData, decryptData };



