var Client = require('./Client').Client;
var C = require('./lib/constants');
var sockets = require('socket.io');

let clients = [];

function configure(server){
   console.log('configuring the proxy server');
   var io = sockets(server);

   io.on(C.CONNECTION, function(socket) {
      let id = ++C.id;
      let client = new Client(socket, id, id);
      clients[client.name] = client;
      console.log(client.name, ' connected');
   });
}

module.exports.configure = configure;