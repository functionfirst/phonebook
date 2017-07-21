var Contact = require('../models/contact');

var contacts = {
  list: list
}

function list(req, res) {
  Contact.find(function(err, contacts) {
    if(err) res.send(err);

    res.json(contacts);
  });
}

module.exports = contacts;