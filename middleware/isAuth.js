const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { checkToken } = require("../utils/jwt");

module.exports = async (req, res, next) => {
  try {
    const decoded = checkToken(req.headers.authorization);
    console.log(decoded);
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return res.status(404);
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
