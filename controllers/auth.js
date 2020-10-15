const db = require("../models/index");
const getErrorMessage = require("../utils/errorHandler");
const hashPassword = require("../utils/hashPassword");
const isPasswordValid = require("../utils/isPasswordValid");
const { createToken } = require("../utils/jwt")

const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isValid = isPasswordValid(password);
    if (isValid !== true) {
      return res.status(400).json({ message: isValid })
    }
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
      return res.status(404).json({
        message: "This email is not registered"
      });
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
