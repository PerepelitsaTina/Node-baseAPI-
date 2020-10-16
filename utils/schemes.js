const yup = require("yup");

const emptyEmail = "Email field is empty";
const emptyPassword = "Password field is empty"; 

const userBodyValidator = yup.object().shape({
  email: yup.string()
    .required(emptyEmail)
    .email("Incorrect email"),
  password: yup.string()
    .required(emptyPassword)
    .min(3, "Password must be longer than 2")
    .max(20, "Password must be shorter than 21")
    .matches(/[^\s]/)
});

const loginValidator = yup.object().shape({
  email: yup.string().required(emptyEmail),
  password: yup.string().required(emptyPassword)
});

  module.exports = {
    userBodyValidator,
    loginValidator
  };

