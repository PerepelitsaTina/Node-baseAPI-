const db = require("../models/index");
const getErrorMessage = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const config = require("../config/defaultConfig");
const hashPassword = require("../utils/hashPassword");
const isPasswordValid = require("../utils/isPasswordValid");

const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message: `Password must be between 3 and 20 characters.
        Password must not contain spaces.`
      });
    }
    const candidate = await db.User.create({
      email,
      password
    });
    const user = candidate.toJSON();
    delete user.password;
    res.json(user);
  } catch (error) {
    const { code, message } = getErrorMessage(error);
    return res.status(code).json({ message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await db.User.findOne({
      where: {
        email
      },
      attributes: {
        include: "password"
      }
    });
    if (!candidate) {
      return res.status(404).json({
        message: "This email is not registered"
      });
    }
    if (hashPassword(password) !== candidate.password) {
      return res.status(400).json({
        message: "Password is wrong"
      });
    }
    const token = jwt.sign({ id: candidate.id }, config.app.jwtSecret, { expiresIn: config.app.expiresIn });
    const user = candidate.toJSON();
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

module.exports = {
  registration,
  login
}
