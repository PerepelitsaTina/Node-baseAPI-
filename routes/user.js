const express = require("express");
const db = require('../models/index');

const router = express.Router();

router.post("/create-user", async (req, res) => {
  const { fullname, email, birthday, password } = req.body;
  const user = await db.User.findOne({
    where: {
      email
    }
  });
  if (user) {
    return res.json({
      message: "This email is already registered"
    });
  }
  try {
    await db.User.create({
      fullname,
      email,
      birthday,
      password
    });
    res.json({
      message: "You are successfully registered"
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something is wrong. Try again"
    });
  }
});

router.get("/get-user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await db.User.findAll({
      where: {
        id: userId
      },
      raw: true
    });
    if (!user) {
      return res.status(404).json({
        message: "User is not found"
      });
    }
    res.send(user);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/get-all", async (req, res) => {
  try {
    const users = await db.User.findAll({raw: true});
  res.send(users);
  }
  catch (error) {
    res.sendStatus(400);
  }
})

router.put("/update-user/:id", async (req, res) => {
  const userId = req.params.id;
  const {fullname, email, birthday, password} = req.body;
  const user = await db.User.findOne({
    where: {
      id: userId
    }
  });
  if (!user) {
    return res.sendStatus(404);
  }
  try {
    await db.User.update({
      fullname,
      email,
      birthday,
      password
    }, {
      where: {
        id: userId
      }
    });
    res.json({
      message: "User is changed"
    });
  }
  catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await db.User.destroy({
      where: {
        id: userId
      }
    });
    res.json({
      message: "User is deleted"
    });
  }
  catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;