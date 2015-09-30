var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var fightSchema = mongoose.Schema({
    code : String,
    name : String,
    source : String,
    destination : String,
    time : String

});

var Fight = mongoose.model('fight',fightSchema,"fight");