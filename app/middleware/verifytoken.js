var jwt = require('jsonwebtoken'),
  config = require('../../config'),
  superSecret = config.secret;

function verifyToken(req, res, next) {
  var token = req.body.token || req.params['token'] || req.headers['x-access-token'];

  if(!token) {
    return accessForbidden(res, 'No token was provided');
  }

  // decode token
  // verify secret and check expiry
  jwt.verify(token, superSecret, function(err, decoded) {
    console.log(err);
    if(err) {
      return accessForbidden(res, 'Failed to authenticate token');
    }

    // Save token to this request for use in other routes
    req.decoded = decoded;
    next();
  });
}

function accessForbidden(res, message) {
  return res.status(403).send({
    success: false,
    message: message
  });
};

module.exports = verifyToken;