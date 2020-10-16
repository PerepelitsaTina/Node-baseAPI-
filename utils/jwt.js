const jwt = require("jsonwebtoken");
const config = require("../config");

const createToken = (userId) => {
  return jwt.sign(
    {
      id: userId
    },
    config.jwt.jwtSecret,
    {
      expiresIn: config.jwt.expiresIn
    }
    );
};

const checkToken = (authHeader) => {
  const token = authHeader.replace("Bearer ", "");
  return jwt.verify(token, config.jwt.jwtSecret);
};

module.exports = {
  createToken,
  checkToken
};
