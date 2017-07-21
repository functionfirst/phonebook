var contacts = require('./contacts');

function api(express) {
  var apiRouter = express.Router();
  apiRouter.get('/phonebook', contacts.list);

  return apiRouter;
}

module.exports = api;