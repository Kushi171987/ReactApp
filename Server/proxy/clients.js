var Client = require('./Client').Client;
var C = require('./lib/constants');

let clients = {};

module.exports.getAll = () => {
   return clients;
};

module.exports.length = () => {
   return Object.keys(clients).length;
};

module.exports.addWithConnection = (conn) => {
   let id = ++C.id;
   let client = new Client(conn, id, id);
   clients[client.id] = client;
   console.log(client.id, ' connected');
   return client.id;
};

module.exports.removeById = (id) => {
   if(clients[id]){
      clients[id].close();
      delete clients[id];
   }
};
