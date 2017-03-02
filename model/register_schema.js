/**
 * Created by vermanil on 2/28/17.
 */
var mongoose = require('mongoose');

var user_schema = mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    gender : String,
    username : {type : String, unique : true},
    password : String,
    todo : [{type: String, default : ""}],
    notification : [{type : String, default: ""}],
    });

var user = mongoose.model('user', user_schema);

module.exports = user;
