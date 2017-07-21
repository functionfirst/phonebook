var express = require('express');
  app = express(),
  http = require('http'),
  config = require('./config'),
  port = process.env.PORT || config.port || 3000;

var contacts = [{
  name: 'Alan',
  email: 'foo@bar.com'
}];

app.get('/phonebook', function(req, res) {
  var contacts = [{
    name: 'Alan',
    email: 'foo@bar.com'
  }];

  res.json(contacts);
});

app.get('*', function(req, res) {
  res.json({
    message: 'Welcome to the Phonebook API'
  });
});

httpServer = http.createServer(app);
httpServer.listen(port);