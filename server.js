var port = process.env.PORT || 8080;
var express = require('express');
var http = require('http');
var app = express();

var routes = require('./routes/index');

app.set('view engine', 'ejs');

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});


app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/', routes);
app.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = app;

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});