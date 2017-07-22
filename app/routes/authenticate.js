var User      = require('../models/user'),
  jwt         = require('jsonwebtoken'),
  config      = require('config'),
  tokenExpiry = config.tokenExpiry,
  superSecret = config.secret;

function authenticate(req, res) {
  var filter = { username: req.body.username };
  var fields = 'username password';

  User.findOne(filter).select(fields).exec(function(err, user) {
    if(err) res.send(err);

    // Check this user exists
    if(!user) {
      return res.json({
        success: false,
        message: 'Authentication failed'
      })
    }

    // Check password matches
    var validPassword = user.comparePassword(req.body.password);

    if(!validPassword) {
      return res.json({
        success: false,
        message: 'Authentication failed'
      });
    }

    // user exists and password is correct
    var token = jwt.sign({
      username: user.username,
      userid: user._id
    }, superSecret, {
      expiresIn: tokenExpiry * (24*60*60) // tokenExpiry in days
    });

    return res.json({
      success: true,
      message: 'Your token has been created',
      token: token
    });
  });
}

module.exports = authenticate;