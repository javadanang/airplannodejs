var express = require('express');
var router = express.Router();
var Flights = require("../models/flight.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/flights', function(req, res, next) {
   Flights.find({},function(error,result){
      if(error) console.log(error);
      res.render('flights', { pageTestScript: '/vendor/test-allfights.js',flights: result });
  });


});



module.exports = router;
