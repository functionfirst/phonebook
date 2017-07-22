var config = require('config');

function logErrors(err, req, res, next) {
  if(config.util.getEnv('NODE_ENV') !== 'test') {
    console.log(err);
  }

  next(err);
}

module.exports = logErrors;