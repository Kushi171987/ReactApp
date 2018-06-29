var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var compression = require('compression');

var admin = require('./admin');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var errors  = require('./Errors/error-hanlder');
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

const log = (req, res, next) => {
   console.log(req.url, req.params);
   next();
};


app.use('/admin', admin);

app.use('/', log, indexRouter);
app.use('/users', log, usersRouter);

app.use(errors.logErrors);
app.use(errors.clientErrorHandler);
app.use(errors.errorHandler);

module.exports = app;
