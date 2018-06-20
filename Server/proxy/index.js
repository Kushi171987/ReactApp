
function configure(server){
   console.log('configuring the proxy server');
   var io = require('socket.io')(server);

   let clients = [];
   let clientIndex = 0;

   emitDate = (client) => {
      client.interval =  setInterval(() => {
         let date = new Date();
         let dateString = date.toDateString() + ' : ' + Date.now()
         console.log('DATE: ', dateString);
         client.emit('date', dateString);
      }, 1000)
   }

   io.on('connection', function(client) {
      client.name = ++clientIndex;
      clients[client.name] = client;

      console.log(client.name, ' connected');
      emitDate(client);

      client.on('message', function(data) {
         console.log('onmessage', data);
      });

      client.on('disconnect', function(reason){
         console.log('disconnect', reason);
         console.log( this.name, ' disconnected');
         if(this.interval){
            clearInterval(this.interval);
         }
      });

      client.on('error', function(error){
         console.error('error', error);
      });
      
   });
}

module.exports.configure = configure;