var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var GitHubStrategy = require('passport-github').Strategy;
const config = require('./config')
const helmet = require('helmet')
app.use(helmet());

// Allow cross-origin.....
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

//+++++++++++++++++PASSPORT FILES++++++++++++++++//
const passport = require('passport')


passport.use(new GitHubStrategy({
    clientID: config.passport.clientID,
    clientSecret: config.passport.clientSecret,
    callbackURL: config.passport.callbackURL,
  },
  function(accessToken, refreshToken, profile, callback) {
    console.log('function ran',profile)
  }
));




var indexRouter = require('./routes/index');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


module.exports = app;
