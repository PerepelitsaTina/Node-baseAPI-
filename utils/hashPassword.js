const crypto = require("crypto");
const config = require("../config")

const hashPassword = (password) => {
  return crypto
    .createHmac(config.hash.hashType, config.hash.hashSecret)
    .update(password)
    .digest(config.hash.digestType);
};

module.exports = hashPassword;