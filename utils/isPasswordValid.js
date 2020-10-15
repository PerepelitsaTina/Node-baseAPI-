const isPasswordValid = (password) => {
  if (!password) {
    return;
  }
  if (password.length < 3) {
    return "Password must be longer than 2";
  }
  if (password.length > 20) {
    return "Password must be shorter than 21";
  }
  if (password.includes(" ")) {
    return "Password must not contain spaces"
  }
  return true;
};

module.exports = isPasswordValid;
