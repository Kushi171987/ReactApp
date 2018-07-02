
const log = (req, res, next) => {
   console.log(req.url, req.params);
   next();
};

var errorHandler = (err, req, res, next) => {
   res.status(500).send('Something broke!')
}

var logErrors = (err, req, res, next) => {
   console.error('Error:->', err.stack)
   next(err)
}

var clientErrorHandler = (err, req, res, next) => {
   if (req.xhr) {
     res.status(500).send({ error: 'Something failed!' })
   } else {
     next(err)
   }
 }

module.exports = {log: log, logErrors: logErrors, clientErrorHandler: clientErrorHandler, errorHandler: errorHandler};
