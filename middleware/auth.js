const jwt = require("jsonwebtoken");
const db = require("../models/index");
const config = require("../config/defaultConfig");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({
        message: "Token is not provided"
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, config.app.jwtSecret);
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User is not found"
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token is expired"
      });
    }
    res.status(500).json({
      message: "Something is wrong"
    });
  }
}
