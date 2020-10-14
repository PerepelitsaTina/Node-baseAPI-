
const _get = require("lodash/get");

const getErrorMessage = (error) => {
  let code;
  let message;
  const errorType = _get(error, "errors[0].type");
  if (
    errorType === "Validation error" ||
    errorType === "notNull Violation"
  ) {
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