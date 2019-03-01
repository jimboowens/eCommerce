var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var GitHubStrategy = require('passport-github').Strategy;
var config = require('./config')
var passport = require('passport')
var helmet = require('helmet')
app.use(helmet());


// Allow cross-origin.....
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

//================PASSPORT FILES================//
// passport is for login via (this time, github) a third party. for 'serialized' 
// session, we must envoke session with passport. look at express-session npm
// docs for more information

app.use(session({
    secret:config.passport.secret,
    resave:config.passport.resave,
    saveUninitialized:config.passport.saveUnitialized,
}));
app.use(passport.initialize())
app.use(passport.session())

passport.use(new GitHubStrategy(
  {clientID: config.passport.clientID,
    clientSecret: config.passport.clientSecret,
    callbackURL: config.passport.callbackURL,},
  (accessToken, refreshToken, profile, callback)=>(callback(null,profile))));

passport.serializeUser((user, callback)=> callback(null,user))
passport.deserializeUser((user,callback)=> callback(null,user))

//================PASSPORT FILES================//


var indexRouter = require('./routes/index');
var gamesRouter = require('./routes/games')
var cartRouter = require('./routes/cart')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/games',gamesRouter);
app.use('/cart',cartRouter);

module.exports = app;
