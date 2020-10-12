const db = require('../models/index');

const registration = async (req, res) => {
  try {
    const { email, password } = req.body;
     const user = await db.User.create({
      email,
      password
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    const errorMessage = error.errors[0].message;
    let comment;
    let code;
    switch (errorMessage) {
      case "User.email cannot be null":
        comment = "Put your email";
        code = 400;
        break
      case "User.password cannot be null":
        comment = "Put your password";
        code = 400;
        break
      case "Validation isEmail on email failed":
        comment = "Incorrect email";
        code = 400;
        break
      case "Validation len on password failed":
        comment = "Password min length is 3, max is 20";
        code = 400;
        break
      case "Validation notContains on password failed":
        comment = "Password can't contain spaces";
        code = 400;
        break
      default:
        comment = "Something is wrong. Try again";
        code = 500;
    }
    return res.status(code).json({ comment });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Put your email"
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Put your password"
      });
    }
    const user = await db.User.findOne({
      where: {
        email
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
    res.json(user);
  } 
  catch (err) {
    return res.status(500).json({
      message: "Something is wrong. Try again"
    })
  }
};

module.exports = {
  registration,
  login
}
