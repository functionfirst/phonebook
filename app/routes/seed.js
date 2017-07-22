var User    = require('../models/user');
var Contact = require('../models/contact');

var userData = {
  username: 'admin',
  password: 'admin'
}

var contactData = [{
  name: 'Willem Dafoe',
  email: 'william.dafoe@mailinator.com',
  mobile: '0786 096 235'
},
{
  name: 'John Leguizamo',
  email: 'john.lequizamo@mailinator.com',
  mobile: '0800 345 234'
},
{
  name: 'Clive Standen',
  email: 'clive.standen@mailinator.com',
  mobile: '0800 345 234'
}];

function seed(req, res, next) {
    var newUser = new User(userData);
    newUser.save();

    for(contact of contactData) {
      var newContact = new Contact(contact);
      newContact.save();
    }

    res.send({
      success: true,
      message: 'Database seeded!'
    });
}

module.exports = seed;