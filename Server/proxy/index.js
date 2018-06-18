
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
      client.name = clientIndex++
      clients[client.name] = client;

      console.log('Client connected: --> ', client.name);
      emitDate(client);

      client.on('message', function(data) {
         console.log(data);
      });

      client.on('disconnect', function(){
         console.log('client disconnected: <-- ', this.name);
         if(this.interval){
            console.log('Date Interval is cleared for : <-- ', this.name);
            clearInterval(this.interval);
         }
      });

   });
}

module.exports.configure = configure;