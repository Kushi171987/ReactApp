var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var compression = require('compression');

var admin = require('./admin');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var debug  = require('./Util/debug-hanlder');
var C = require('./Util/constants');

var app = express();
app.locals.title = 'AppServer';

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build'), C.options))
app.set('trust proxy', true);

app.use('/admin', admin);
app.use('/', debug.log, indexRouter);
app.use('/users', debug.log, usersRouter);

app.use(debug.logErrors);
app.use(debug.clientErrorHandler);
app.use(debug.errorHandler);

module.exports = app;
