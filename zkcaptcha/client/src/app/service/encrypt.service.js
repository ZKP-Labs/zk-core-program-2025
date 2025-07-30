import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_AES_KEY;

export const encrypt = (text) => {
  const key = CryptoJS.enc.Base64.parse(SECRET_KEY);
  const encrypted = CryptoJS.AES.encrypt(text, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

export const decrypt = (cipherText) => {
  const key = CryptoJS.enc.Base64.parse(SECRET_KEY);
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
