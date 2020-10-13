const db = require('../models/index');
const getErrorMessage = require("../utils/errorHandler");

const createUser = async (req, res) => {
  try {
    const { fullname, email, birthday, password } = req.body;
    const user = await db.User.create({
      fullname,
      email,
      birthday,
      password
    });
    const userWithoutPassword = {
      fullname: user.fullname,
      email: user.email,
      birthday: user.birthday
    }
    res.json(userWithoutPassword);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return res.status(errorMessage.code).json({ message: errorMessage.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        message: "User is not found"
      });
    }
    res.json(user);
  }
  catch (error) {
    return res.status(500);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { fullname, email, birthday, password } = req.body;
    const result = await db.User.update({
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
    if (!result[1].length) {
      return res.sendStatus(404);
    }
    const user = result[1][0];
    const userWithoutPassword = {
      fullname: user.fullname,
      email: user.email,
      birthday: user.birthday
    }
    res.json(userWithoutPassword);
  }
  catch (error) {
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
    } else {
      res.status(204).json({
        message: "User is deleted"
      });
    }
  }
  catch (error) {
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
