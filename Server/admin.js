var express = require('express');

var admin = express();
admin.locals.title = 'Admin';

admin.on('mount', function (parent) {
  console.log('`'+admin.locals.title +'` mounted on: `'+ parent.name+'`');
});

admin.get('/', function (req, res) {
  res.send('Admin Homepage');
});

module.exports = admin;