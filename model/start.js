/**
 * Created by vermanil on 2/28/17.
 */
var mongoose = require('mongoose');
var user = require('./register_schema');
/*var uri = 'mongodb://intern23:interndb1@ds061415.mlab.com:61415/intern23';*/

var uri = 'mongodb://bookie:bookiedb1@ds149207.mlab.com:49207/bookie';
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected");
});