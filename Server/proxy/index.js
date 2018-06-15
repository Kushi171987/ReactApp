
function configure(server){
   console.log('configuring the proxy server');
   var io = require('socket.io')(server);

   let clients = [];
   let clientIndex = 0;

   io.on('connection', function(client) {
      client.name = clientIndex++
      clients[client.name] = client;

      console.log('Client connected: --> ', client.name);
      
      client.on('data', function(data) {
         console.log(data);
         setInterval(() => {
            let date = new Date();
            let dateString = date.toDateString() + ' : ' + Date.now()
            console.log('DATE: ', dateString);
            client.emit('date', dateString);
         }, 1000)
      });

      client.on('disconnect', function(){
         console.log('client disconnected: <-- ', this.name);
      });

   });
}

module.exports.configure = configure;