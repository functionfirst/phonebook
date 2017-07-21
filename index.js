var express = require('express');
  app = express(),
  http = require('http'),
  config = require('./config');


app.get('*', function(req, res) {
  res.json({
    message: 'Welcome to the Phonebook API'
  });
});

httpServer = http.createServer(app);
httpServer.listen(config.port);

console.log('Listening on port ' + config.port);