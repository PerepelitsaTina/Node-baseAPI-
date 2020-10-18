const db = require('../models/index');
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res, next) => {
  try {
    const {
      fullname,
      email,
      birthday,
      password
    } = req.body;
    
    let user = await db.User.create({
      fullname,
      email,
      birthday,
      password
    });
    
    user = user.toJSON();
    delete user.password;
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    if (+req.params.id === req.user.id) {
      return res.json(req.user);
    }
    throw {
      status: StatusCodes.NOT_FOUND,
      message: "User is not found"
    };
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const {
      fullname,
      email,
      birthday,
      password
    } = req.body;

    let [isUpdated, [user]] = await db.User.update({
      fullname,
      email,
      birthday,
      password
    }, {
      where: {
        id: req.params.id
      },
      returning: true
    });

    if (!isUpdated) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: "User is not found"
      };
    }
    user = user.toJSON();
    delete user.password;
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await db.User.destroy({
      where: {
        id: req.params.id
      }
    });
    if (result === 0) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: "User is not found"
      };
    }
    res.status(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};