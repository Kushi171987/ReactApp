var C = require('./lib/constants');
var eventEmitter = require('./lib/event-emitter');

function Client(socket, id, name) {
   this.id = id;
   this.socket = socket;
   this.name = name;
   this.interval = undefined;
   eventEmitter.instantiateEmitter(this);

   let self = this;

   emitDate = () => {
      this.interval =  setInterval(() => {
         let date = new Date();
         let dateString = date.toDateString() + ' : ' + Date.now()
         console.log('DATE: ', dateString);
         this.emit('date', dateString);
      }, 1000);
   };

   removeListeners = () => {
      this.removeAllListeners()
      if(self.interval){
         clearInterval(self.interval);
      }
   };

   socket.on(C.MESSAGE, function(data) {
      console.log(C.MESSAGE, data);
   });

   socket.on(C.DISCONNECT, function(reason){
      console.log(self.name, 'disconnected, Reasion:', reason);
      removeListeners();
   });

   socket.on(C.ERROR, function(error){
      console.error(C.ERROR, error);
      removeListeners();
   });

   this.emit = function(key, value) {
      socket.emit(key, value);
   };

   this.close = () => {
      if(socket && socket.connected){
         socket.disconnect();
      }
   };

   emitDate();
}

eventEmitter.makeEmitter(Client);
module.exports.Client = Client;