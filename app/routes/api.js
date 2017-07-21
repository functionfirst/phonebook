var contacts = require('./contacts');

function api(express) {
  var apiRouter = express.Router();
  
  // CONTACT API
  apiRouter.get('/phonebook', contacts.list);
  apiRouter.post('/phonebook', contacts.create);
  apiRouter.put('/phonebook/:id', contacts.update);
  apiRouter.delete('/phonebook/:id', contacts.remove);

  return apiRouter;
}

module.exports = api;