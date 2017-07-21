var mongoose  = require('mongoose'),
  config      = require('../../config');

var uristring = 'mongodb://' + config.db.host + '/' + config.db.name;
var db = mongoose.createConnection(uristring);

module.exports = db;