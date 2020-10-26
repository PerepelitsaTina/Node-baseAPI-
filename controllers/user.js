const db = require('../models/index');
const { StatusCodes } = require("http-status-codes");

const createUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      role,
      status
    } = req.body;

    let user = await db.User.create({
      email,
      password,
      role,
      status
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
    let user = await db.User.findByPk(req.params.id);
    if (user) {
      user = user.toJSON();
      delete user.password;
      return res.json(user);
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
  console.log(req);
  try {
    const {
      email,
      role,
      status
    } = req.body;
    let updatedUser = {
      email,
      role,
      status
    };

    if (req.body.password) {
      updatedUser.password = req.body.password;
    }

    let [isUpdated, [user]] = await db.User.update(updatedUser, {
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
    console.log(error);
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