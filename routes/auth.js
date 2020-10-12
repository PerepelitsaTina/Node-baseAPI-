const express = require("express");
const db = require('../models/index');

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullname, email, birthday, password } = req.body;
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
    res.json({
      message: "Something is wrong. Try again"
    });
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Empty fields"
    });
  };
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.json({
        message: "This email is not registered"
      });
    }
    if (password !== user.password) {
      return res.json({
        message: "Password is wrong"
      })
    }

    res.json({
      message: "You are successfully logged in"
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
