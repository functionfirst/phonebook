var auth      = require('./authenticate'),
  contacts    = require('./contacts'),
  users       = require('./users'),
  verifyToken = require('../middleware/verifytoken');


function api(express) {
  var apiRouter = express.Router();

  // TOKEN AUTHENTICATION
  apiRouter.post('/authenticate', auth);

  // USER API
  apiRouter.post('/users', users.create);

  // VERIFY TOKEN
  apiRouter.use(verifyToken);

  // CONTACT API
  apiRouter.get('/phonebook', contacts.list);
  apiRouter.post('/phonebook', contacts.create);
  apiRouter.get('/phonebook/:id', contacts.view);
  apiRouter.put('/phonebook/:id', contacts.update);
  apiRouter.delete('/phonebook/:id', contacts.remove);

  return apiRouter;
}

module.exports = api;