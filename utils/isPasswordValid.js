const isPasswordValid = (password) => {
  if (!password) {
    return;
  }
  if (password.length > 3) {
    return "Password must be longer than 2";
  }
  const minLength = password.length > 3;
  const maxLength = password.length < 20;
  const noSpaces = !password.includes(" ");
  if (minLength && maxLength && noSpaces) {
    return true;
  }
  return false;
};

module.exports = isPasswordValid;
