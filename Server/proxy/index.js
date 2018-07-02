var Socket = require('socket.io');

var clients = require('./clients');
var C = require('./lib/constants');

var SOCKET_CONFIG = {
   // path: '/test',
   // adapter: 
   // origins: *, 
   // parser :
   // transports ['polling', 'websocket'],
   serveClient: false,
   pingInterval: 20000,
   pingTimeout: 10000,
   cookie: false
};

function configure(server){
   console.log('configuring the proxy server');
   var socket = Socket(server, SOCKET_CONFIG);

   socket.on(C.CONNECTION, function(conn) {
      clients.addWithConnection(conn);
   });
}

module.exports.configure = configure;
