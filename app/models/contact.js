var mongoose = require('mongoose');
var db = require('../lib/db');

var ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  }
});

module.exports = db.model('Contact', ContactSchema);