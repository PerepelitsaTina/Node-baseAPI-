const { StatusCodes } = require("http-status-codes");

const db = require("../models/index");
const hashPassword = require("../utils/hashPassword");
const { createToken } = require("../utils/jwt")

const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await db.User.create({
      email,
      password
    });
    const token = createToken(user.id);
    user = user.toJSON();
    delete user.password;
    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
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
        message: "User is not found"
      };
    }
    if (hashPassword(password) !== user.password) {
      throw {
        status: StatusCodes.BAD_REQUEST, 
        message: "Password is wrong"
      };

    }
    const token = createToken(user.id);
    user = user.toJSON();
    delete user.password;
    res.json({
      user,
      token
    });
  } catch (error) {
    next(error);
  }
};

const me = (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  login,
  me
}
