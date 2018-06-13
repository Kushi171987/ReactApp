var express = require('express');
var router = express.Router();

router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
});

router.get('/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

router.get('/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});


/* GET users listing. */
router.get('/', function(req, res, next) {
   console.log('/users/ Router')
   res.send('respond with a resource');
});

module.exports = router;
