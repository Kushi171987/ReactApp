var request = require('request');

var http = require('./lib/http');
var C = require('./lib/constants');
var eventEmitter = require('./lib/event-emitter');

function Client(socket, id, name) {
   this.id = id;
   this.socket = socket;
   this.name = name;
   this.interval = undefined;
   eventEmitter.instantiateEmitter(this);

   let self = this;

   getTemparature = (callback) => {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=Hyderabad,In&units=imperial&appid=${C.APP_ID}`
      request(url, function (err, response, body) {
         if(err){
            console.error(err);
            callback("Error, please try again");
         } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
               callback("Error, please try again");
            } else {let temp = ((weather.main.temp-32) / 1.8).toFixed(2);
               let weatherText = `It's ${temp} degrees (Celsius) in ${weather.name}!`;
               callback(weatherText);
            }
         }
      });
   }

   doEmit = () => {
      this.interval =  setInterval(() => {
         let date = new Date();
         let dateString = date.toDateString() + ' : ' + Date.now()
         this.emit('date', dateString);

         getTemparature((tempTxt) => {
            this.emit('temp', tempTxt);
         });
      }, 5000);
   }

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

   doEmit();
}

eventEmitter.makeEmitter(Client);
module.exports.Client = Client;