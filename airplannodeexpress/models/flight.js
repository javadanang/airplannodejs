var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var flightSchema = mongoose.Schema({
    code : String,
    name : String,
    source : String,
    destination : String,
    time : String

});

var Flights = mongoose.model('flights',flightSchema,"flights");
module.exports = Flights;