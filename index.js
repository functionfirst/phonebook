var express = require('express');
  app = express(),
  http = require('http'),
  port = 3000;


app.get('*', function(req, res) {
  res.json({
    message: 'Welcome to the Phonebook API'
  });
});

httpServer = http.createServer(app);
httpServer.listen(port);

console.log('Listening on port ' + port);