var Client = require('./Client').Client;
var C = require('./lib/constants');
var Socket = require('socket.io');

let clients = [];

function configure(server){
   console.log('configuring the proxy server');
   var socket = Socket(server);

   socket.on(C.CONNECTION, function(conn) {
      let id = ++C.id;
      let client = new Client(conn, id, id);
      clients[client.name] = client;
      console.log(client.name, ' connected');
   });
}

module.exports.configure = configure;