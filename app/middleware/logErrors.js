function logErrors(err, req, res, next) {
  console.log(err);

  next(err);
}

module.exports = logErrors;