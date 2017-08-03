var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var users = require('./routes/users');
var score =  require('./routes/score');
var makeup = require('./routes/makeup');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: false,
	secret: 'score'
}));

app.use('/users', users);
app.use('/score', score);
app.use('/makeup', makeup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3004,  function() {
	console.log('server running http://localhost:3004');
});
