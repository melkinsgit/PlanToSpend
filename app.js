// Plan To Spend Project 2 app js

var express = require('express');  // web app framework - app.js, views, basic routes, package.json & public for images, style sheets & java scripts; implement express <directory/project name>
var path = require('path');  // handles and transforms path names using string transformation, does not check validity of paths
var favicon = require('serve-favicon');  // DO WE USE THIS? for error messages?
var logger = require('morgan');  // helps with req logging?
var cookieParser = require('cookie-parser');  // allows object cookie info sent with req?
var bodyParser = require('body-parser');  // populates req.body with a parsed body - can be converted to JSON with call to schema
var mongoose = require('mongoose');  // enables creation of schema and simplified use of MongoDB
var session = require('express-session');  // allows saving of cookie data - used for user id content
var flash = require('connect-flash');  // for sending temporary messages along with redirects so message can be displayed with redirect
var passport = require('passport');  // for request authentication - provides ability to redirect based on success or failure

// define vars that will be accessed when defining app.use statements for accessing js files in posts and gets
var routes = require('./routes/index');  // use routes to access index route js file
var users = require('./routes/users');  // use users to access users route js file
var plans = require('./routes/plans');  // use plans to access plans route js file
var enterData = require('./routes/enterData');  // use enterData to access enterData route js file
var cats = require('./routes/cats');  // use cats to access cats route js file
var planmain = require('./routes/plainmain');
// connect to Mongoose db
var db = mongoose.connect('mongodb://localhost:27017/spendrecords');

var app = express();

require('./config/passport')(passport);  // use passport
// passport.js module.export exports a function
// that expects to a passport object as an argument
// this require statement calls the function
// (defined in the passport file in config) with the
// passport object required in line 10

app.use(passport.initialize());  // use passport
app.use(session({ 'secret' : 'something random'}) );  // use passport
app.use(flash());  // use connect-flash

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // using path to define view engine - engine for views files created using express
app.set('view engine', 'jade');  // we're using jade files

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));  // using morgan
app.use(bodyParser.json());  // using body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());  // using cookie-parser
app.use(express.static(path.join(__dirname, 'public')));  // using path

// using various route vars previously defines
app.use('/', routes);
app.use('/users', users);
app.use('/plans', plans);
app.use('/enterData', enterData);

isLoggedIn = require('./middleware/isLoggedIn');
app.use('/cats', isLoggedIn);
app.use('/cats', cats);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
