var express = require('express');
  app = express(),
  http = require('http'),
  config = require('./config'),
  api = require('./app/routes/api')(express),
  port = process.env.PORT || config.port || 3000;

// Implement API
app.use(api);

// Fall-back for all other requests
app.get('*', function(req, res) {
  res.json({
    message: 'Welcome to the Phonebook API'
  });
});

httpServer = http.createServer(app);
httpServer.listen(port);