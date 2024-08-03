const CryptoJS = require('crypto-js');
const fs = require('fs');

const config = require('../../config/auth.config');

exports.getPassword = () => {
  const cipherText = fs.readFileSync(config.binFilePath, 'utf8');

  return getDecryptedKey(cipherText);
};


function getDecryptedKey(cipherText) {
  const pemKey = fs.readFileSync(config.encryptionKeyPath, 'utf8');

  const key = CryptoJS.enc.Utf8.parse(pemKey);
  const iv = CryptoJS.enc.Utf8.parse(pemKey);

  var decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    keySize: 256 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
