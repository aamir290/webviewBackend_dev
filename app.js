/**
 * Express application creation script.
 * Initiate express and middleware.
 * Add routing.
 */

//Includes middleware
var express = require('express');
var path = require('path');
// const loggerMiddleware = require('./src/infrastructure/logging/requestLoggerToFile');

//Router
// var indexRouter = require('./src/infrastructure/routes/index');

//Configure application object
var app = express();

// app.use(loggerMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = app;
