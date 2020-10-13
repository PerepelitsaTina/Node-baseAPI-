const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/app");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
  req.headers.authorization
  if (!authHeader) {
    res.status(401).json({
      message: "Token is not provided"
    });
  }
  const token = authHeader.replace("Bearer ", "");
    jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "Invalid token"
      });
    }
  }
}