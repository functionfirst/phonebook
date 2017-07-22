var express     = require('express');
  app           = express(),
  bodyParser    = require('body-parser')
  http          = require('http'),
  errorHandler  = require('./app/middleware/errorHandler'),
  logErrors     = require('./app/middleware/logErrors'),
  config        = require('config'),
  api           = require('./app/routes/api')(express),
  port          = process.env.PORT || config.port || 3000;

// APP CONFIG
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(bodyParser.json());

// Implement API
app.use(api);

// Fall-back for all other requests
app.get('*', function(req, res) {
  res.json({
    message: 'Welcome to the Phonebook API'
  });
});

app.use(logErrors);
app.use(errorHandler);

httpServer = http.createServer(app);
httpServer.listen(port);