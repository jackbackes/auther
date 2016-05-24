'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'lasagnanorthkorea' // or whatever you like
}));
// place right after the session setup middleware
app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

// app.use(cookieParser());
app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));
app.use(require('./logging.middleware'));

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log(req.connection.remoteAddress + "'s counter", ++req.session.counter);
  next();
});
app.use('/api', require('../api/api.router'));
app.use(require('./auth/auth.router'))

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
