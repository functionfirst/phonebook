var express = require('express');
  app = express(),
  http = require('http'),
  config = require('./config'),
  port = process.env.PORT || config.port || 3000;

var Contact = require('./app/models/contact');

app.get('/phonebook', function(req, res) {
  Contact.find(function(err, contacts) {
    if(err) res.send(err);

    res.json(contacts);
  });
});

app.get('*', function(req, res) {
  res.json({
    message: 'Welcome to the Phonebook API'
  });
});

httpServer = http.createServer(app);
httpServer.listen(port);