const errorHandler = (err, req, res) => {
  console.log(err.name);
  let errorStatus = err.status || 500;
  let errorMessage = err.message;
  if (err.name === "SequelizeUniqueConstraintError") {
    errorStatus = 400;
    errorMessage = "Email is already registered";
  }
  res.status(errorStatus).json({message: errorMessage});
}

module.exports = errorHandler;