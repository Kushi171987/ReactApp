#!/usr/bin/env node

/**
 * Module dependencies.
 */

var debug = require('debug')('express:server');
var http = require('http');
var app = require('./app');
var proxy = require('./proxy');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3030');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
proxy.configure(server);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
// server.on('listening', onListening);
// server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
server.listen(port, () => console.log(`Server running on PORT: ${port}`));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// Process releted callbacks
process.on('exit', (code) => {
   console.log(`About to exit with code: ${code}`);
});

process.on('unhandledRejection', (reason, promise) => {
   console.log('Unhandled Rejection at:', reason.stack || reason)
});

process.on('uncaughtException', (error) => {
   console.log('uncaughtException', error.stack);
});

process.on('warning', (warning) => {
   console.warn(warning.name, warning.message);    // Print the warning name, message
   console.warn(warning.stack);   // Print the stack trace
 });
