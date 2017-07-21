var Contact = require('../models/contact');

var contacts = {
  list: list,
  create: create,
  update: update,
  remove: remove
}

function list(req, res) {
  Contact.find(function(err, contacts) {
    if(err) res.send(err);

    res.json(contacts);
  });
}

function create(req, res) {
  res.json({
    error: true,
    message: 'Create not implemented yet.'
  });
}

function update(req, res) {
  res.json({
    error: true,
    message: 'Update not implemented yet.'
  });
}

function remove(req, res) {
  res.json({
    error: true,
    message: 'Delete not implemented yet.'
  });
}

module.exports = contacts;