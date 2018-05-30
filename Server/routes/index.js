var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send(` ${req.param.name}!`)
  // res.render('index', { title: 'Express' });
});

router.get('/*', (req, res) => {
  console.log('/* Router', req.params['0'])
  res.send(req.params['0'])
})

router.get('/Kushi', (req, res) => {
  res.send('/Kushi Router', req.params['0'])
})

module.exports = router;
