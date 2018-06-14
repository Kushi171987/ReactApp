var util = require('../Util/util');

/*
* Merge() Test Cases:
*/
let object1 = {
   name: 'Kushi',
   age: 30,
   hieght: '5.11',
   village: 'Kristipadu'
};
let object2 = {
   name: 'Kushi',
   study: 'MCA',
   village: 'KGPalli'
};

let object3 = {

};

let object = util.merge(object1, object2);
console.log(object);
