var Contact = require('../models/contact');

function api(express) {
  var apiRouter = express.Router();
  apiRouter.get('/phonebook', contactList);

  return apiRouter;
}

function contactList(req, res) {
  Contact.find(function(err, contacts) {
    if(err) res.send(err);

    res.json(contacts);
  });
}

module.exports = api;