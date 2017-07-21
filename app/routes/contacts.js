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
  var contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile
  });

  contact.save(function(err, c) {
    if(err) throw err;

    res.json({
      success: true,
      message: 'New contact created successfully'
    });
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