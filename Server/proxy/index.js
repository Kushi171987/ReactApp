var Socket = require('socket.io');

var clients = require('./clients');
var C = require('./lib/constants');

function configure(server){
   console.log('configuring the proxy server');
   var socket = Socket(server);

   socket.on(C.CONNECTION, function(conn) {
      clients.addWithConnection(conn);
   });
}

module.exports.configure = configure;
