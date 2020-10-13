
const getErrorMessage = (error) => {
  let code;
  let message;
  if (error.errors[0].type === "Validation error" ||
    error.errors[0].type === "notNull Violation") {
    code = 400;
    message = error.message;
  } else {
    code = 500;
    message = "Something is wrong";
  }
  return {
    code,
    message
  }
};

module.exports = getErrorMessage;