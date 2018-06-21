var EventEmitter = require('events');
var util = require('util'); // this is node util

module.exports.makeEmitter = function (contructor) {
   util.inherits(contructor, EventEmitter);
};

module.exports.instantiateEmitter = function (object) {
   EventEmitter.call(object);
};
