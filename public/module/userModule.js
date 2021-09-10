const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user',{useNewUrlParser:true});
var conn = mongoose.connection;
 

var userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    mobile : {type:Number,require:true},
    email:{type:String,require:true},
    gender:{type:String,require:true},
    uname:{type:String,require:true},
    pass:{type:String,require:true,unique:true},

});
var userModel = mongoose.model('userDetails',userSchema);

module.exports=userModel;