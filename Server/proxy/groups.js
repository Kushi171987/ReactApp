var C = require('./lib/constants');

let groups = {};

module.exports.getAll = () => {
   return groups;
};

module.exports.length = () => {
   return Object.keys(groups).length;
};

module.exports.add = () => {
   let id = ++C.id;
   groups[id] = Object;
   return id;
};

module.exports.remove = (id) => {
   if(groups[id]){
      delete groups[id];
   }
};
