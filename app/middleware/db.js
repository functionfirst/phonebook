var mongoose  = require('mongoose'),
  config      = require('../../config');

var uristring = 'mongodb://' + config.db.host + '/' + config.db.name;
mongoose.Promise = global.Promise;
var db = mongoose.createConnection(uristring);

module.exports = db;