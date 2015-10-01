var express = require('express');
var router = express.Router();
var Flights = require("../models/flight.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/flights', function(req, res, next) {
 /* Flights.find({},function(err, flight){
    res.json (flight.map ( function(resutl){
      return {
        id: resutl._id,
        name : resutl.name,
        source: resutl.source,
        code: resutl.code,
        destination : resutl.resutl,
        time : resutl.time
      }
    }));
  }).sort("name").limit(20);*/



  Flights.find({},function(error,result){
      if(error) console.log(error);
      res.render('flights', { flights: result });
  });


});



module.exports = router;
