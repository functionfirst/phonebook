var Contact = require('../models/contact');

var contacts = {
  list: list,
  view: view,
  create: create,
  update: update,
  remove: remove
}

function list(req, res) {
  Contact.find({},  'name email mobile', function(err, contacts) {
    if(err) return res.send(err);

    res.json(contacts);
  });
}

function view(req, res) {
  Contact.findById(req.params.id, 'name email mobile', function(err, contact) {
    if(err) return res.send(err);

    res.json(contact);
  });
}

function create(req, res) {
  var contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile
  });

  contact.save(function(err, c) {
    if(err) return res.send(err);

    res.json({
      success: true,
      contact: contact,
      message: 'New contact created successfully'
    });
  });
}

function update(req, res) {
  Contact.findById(req.params.id, function(err, contact) {
    if(err) return res.send(err);

    if(req.body.name) contact.name = req.body.name;
    contact.email = req.body.email;
    contact.mobile = req.body.mobile;

    contact.save(function(err, c){
      if(err) return res.send(err);

      res.json({
        success: true,
        contact: contact,
        message: "Contact has been updated successfully"
      });
    });
  });
}

function remove(req, res) {
  Contact.findByIdAndRemove(req.params.id, function(err, contact) {
    if(err) return res.send(err);

    res.json({
      success: true,
      id: contact.id,
      message: 'Contact has been deleted successfully'
    });
  });
}

module.exports = contacts;