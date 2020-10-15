const db = require('../models/index');
const getErrorMessage = require("../utils/errorHandler");
const isPasswordValid = require('../utils/isPasswordValid');

const createUser = async (req, res) => {
  try {
    const {
      fullname,
      email,
      birthday,
      password
    } = req.body;

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message: `Password must be between 3 and 20 characters.
        Password must not contain spaces.`
      });
    }
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
    const errorMessage = getErrorMessage(error);
    return res.status(errorMessage.code).json({
      message: errorMessage.message
    });
  }
};

const getUser = async (req, res) => {
  try {
    if (+req.params.id === req.user.id) {
      return res.json(req.user);
    }
    return res.status(404);
  } catch (error) {
    res.status(500);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500);
  }
};

const updateUser = async (req, res) => {
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
      return res.sendStatus(404);
    }
    user = user.toJSON();
    delete user.password;
    res.json(user);
  } catch (error) {
    return res.status(500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await db.User.destroy({
      where: {
        id: req.params.id
      }
    });
    if (result === 0) {
      return res.sendStatus(404);
    }
    res.status(204);
  } catch (error) {
    return res.status(500);
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
};