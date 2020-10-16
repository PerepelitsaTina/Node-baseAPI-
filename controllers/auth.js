const db = require("../models/index");
const getErrorMessage = require("../utils/errorHandler");
const hashPassword = require("../utils/hashPassword");
const { createToken } = require("../utils/jwt")
const {
  ReasonPhrases,
  StatusCodes,
} = require("http-status-codes");

const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await db.User.create({
      email,
      password
    });
    user = user.toJSON();
    delete user.password;
    res.json(user);
  } catch (error) {
    console.log(error);
    const { code, message } = getErrorMessage(error);
    return res.status(code).json({ message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await db.User.findOne({
      where: {
        email
      },
      attributes: {
        include: "password"
      }
    });
    if (!user) {
      throw {
        status: StatusCodes.NOT_FOUND, 
        message: ReasonPhrases.NOT_FOUND
      };
    }
    if (hashPassword(password) !== user.password) {
      return res.status(400).json({
        message: "Password is wrong"
      });
    }
    const token = createToken(user.id);
    user = user.toJSON();
    delete user.password;
    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something is wrong. Try again"
    });
  }
};

const me = (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    return res.status(500);
  }
};

module.exports = {
  registration,
  login,
  me
}
