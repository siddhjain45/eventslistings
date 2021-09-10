
const { url } = require('inspector');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user',{useNewUrlParser:true});
var conn = mongoose.connection;
 
var eventSchema = mongoose.Schema({
    name : String,
    about : String,
    organiser : String,
    mode : String,
    start : String,
    end : String,
    link : String,
})

var eventModel = mongoose.model('events',eventSchema);

module.exports = eventModel;