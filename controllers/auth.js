const db = require("../models/index");
const getErrorMessage = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { jwtSecret } = require("../config/app");

const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.create({
      email,
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

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await db.User.findOne({
//       where: {
//         email
//       },
//       attributes: {
//         include: ["password"]
//       }
//     });
//     if (!user) {
//       return res.status(404).json({
//         message: "This email is not registered"
//       });
//     }
//     if (password !== user.password) {
//       return res.status(400).json({
//         message: "Password is wrong"
//       })
//     }
//     const userWithoutPassword = {
//       fullname: user.fullname,
//       email: user.email,
//       birthday: user.birthday
//     }
//     res.json(userWithoutPassword);
//   }
//   catch (err) {
//     return res.status(500).json({
//       message: "Something is wrong. Try again"
//     })
//   }
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({
      where: {
        email
      },
      attributes: {
        include: ["password"]
      }
    });
    if (!user) {
      return res.status(404).json({
        message: "This email is not registered"
      });
    }
    if (password !== user.password) {
      return res.status(400).json({
        message: "Password is wrong"
      })
    }
    const token = jwt.sign(user.id.toString(), jwtSecret);
    res.json({
      fullname: user.fullname,
      email: user.email,
      birthday: user.birthday,
      token
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something is wrong. Try again"
    })
  }
};


module.exports = {
  registration,
  login
}
