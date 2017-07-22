var express     = require('express');
  app           = express(),
  bodyParser    = require('body-parser')
  errorHandler  = require('./app/middleware/errorHandler'),
  logErrors     = require('./app/middleware/logErrors'),
  path          = require('path'),
  config        = require('config'),
  api           = require('./app/routes/api')(express),
  port          = process.env.PORT || config.port || 3000;

// APP CONFIG
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use(bodyParser.json());

// Homepage
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/app/views/index.html'));
});

// Implement API
app.use(api);

app.use(logErrors);
app.use(errorHandler);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app;