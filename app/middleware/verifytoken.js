var jwt       = require('jsonwebtoken'),
  config      = require('../../config'),
  Forbidden   = require('../lib/errors').Forbidden,
  superSecret = config.secret;

function verifyToken(req, res, next) {
  var token = req.body.token || req.params['token'] || req.headers['x-access-token'];

  if(!token) {
    return next(Forbidden('No token was provided'));
  }

  // decode token
  // verify secret and check expiry
  jwt.verify(token, superSecret, function(err, decoded) {
    if(err) {
      return next(Forbidden('Failed to authenticate token'));
    }

    // Save token to this request for use in other routes
    req.decoded = decoded;
    next();
  });
}

module.exports = verifyToken;