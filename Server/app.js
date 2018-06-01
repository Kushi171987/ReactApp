var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../build')))
app.set('trust proxy', true);

const log = (req, res, next) => {
   console.log(req.url, req.params);
   next();
};

app.use('/', log, indexRouter);
app.use('/users', log, usersRouter);

module.exports = app;
