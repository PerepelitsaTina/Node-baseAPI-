const db = require('../models/index');

const createUser = async (req, res) => {
  try {
    const { fullname, email, birthday, password } = req.body;
    const user = await db.User.create({
      fullname,
      email,
      birthday,
      password
    });
    res.json(user);
  } catch (error) {
    res.json({
      message: "Something is wrong. Try again"
    });
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
      }
    });
    if (result === 1) {
      const updatedUser = await db.User.findByPk(userId);
      return res.json(updatedUser);
    } else {
      return res.sendStatus(404);
    }
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
    if (result === 1) {
      res.status(200).json({
        message: "User is deleted"
      });
    } else {
      res.sendStatus(404);
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
}