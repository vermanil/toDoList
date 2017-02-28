var express = require('express');
var router = express.Router();
var app = express();
var user = require('../model/register_schema')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world' });
});

router.post('/login', function (req, res, next){
    user.findOne({username:req.body.username}, function (err, logindata) {
        if (err)
            console.log(err)
        else if (req.body.username === logindata.username && req.body.password === logindata.password)
        {
            console.log("successfully login");
            res.redirect('/');
        }
        else
            console.log("invalid username or password");
    });

});

console.log("Listening on port 3000");
/*
app.listen(3000, function () {
    console.log("server listening at server 127.0.0.1 on port 3000")
});
*/

module.exports = router;
