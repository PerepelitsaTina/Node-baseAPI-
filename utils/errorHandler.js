const errorHandler = (err, req, res) => {
  let errorStatus = err.status || 500;
  res.status(errorStatus).json({message: err.message});
}

module.exports = errorHandler;