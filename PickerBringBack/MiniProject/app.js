var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var cors = require('cors'); // https://dev.to/p0oker/why-is-my-browser-sending-an-options-http-request-instead-of-post-5621
// need to: npm i --save cors

const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/index')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("DataBase Connected"))

app.use(express.json())
app.use(cors())
app.use('/app', routes)
app.listen(4000, () => console.log("Server running"))


// view engine setup
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // https://dev.to/p0oker/why-is-my-browser-sending-an-options-http-request-instead-of-post-5621

app.use('/', routes);

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