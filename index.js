var express = require('express');
  app = express(),
  http = require('http'),
  config = require('./config'),
  port = process.env.PORT || config.port || 3000;

app.get('*', function(req, res) {
  res.json({
    message: 'Welcome to the Phonebook API'
  });
});

httpServer = http.createServer(app);
httpServer.listen(port);