
var errorHandler = (err, req, res, next) => {
   console.error(err.stack)
   res.status(500).send('Something broke!', err.toString())
}

module.exports = errorHandler;
