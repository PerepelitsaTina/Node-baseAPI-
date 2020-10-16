const yup = require("yup");

module.exports = ({ shape, path = "body" }) => async (req, res, next) => {
  try {
    const validData = await shape.validate(req[path]);
    req.validData = validData;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};