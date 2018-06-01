var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send(` ${req.param.name}!`)
  // res.render('index', { title: 'Express' });
});

router.get('/*', (req, res, next) => {
      console.log('/* Router-1', req.params[0])
      console.log('Middleware-1');
      if(req.params[0] === 'Kushal'){
         next();
      } else {
         next('route');
      }
   }, (req, res, next) => {
      console.log('Middleware-2');
      next();
   }, (req, res) => {
      res.send(req.params[0])
})

router.get('/*', (req, res, next) => {
      console.log('/* Router-2', req.params[0])
      if(req.params[0] === 'Kushi' || req.params[0] === 'Reddy'){
         next('route');
      } else {
         next();
      }
   }, (req, res) => {
      res.send(req.params[0]);
});

router.get('/Reddy', (req, res, next) => {
   console.log('/Reddy Router', req.params[0])
   res.send(req.params[0])
})

router.get('/Kushi', (req, res, next) => {
   console.log('/Kushi Router', req.params)
   res.send(req.params[0])
})

module.exports = router;
