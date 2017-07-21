var User = require('../models/user');

var users = {
  create: create
}

function create(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err, u) {
    if(err) res.send(err);

    res.json({
      success: true,
      message: 'New account created successfully'
    });
  });
}

module.exports = users;