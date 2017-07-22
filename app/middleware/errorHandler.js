function errorHandler(err, req, res, next) {
  if (req.app.get('env') !== 'development') {
    delete err.stack;
  }

  res.status(err.status || 500);
  res.send(err);
}

module.exports = errorHandler;