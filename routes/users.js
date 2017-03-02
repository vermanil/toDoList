var express = require('express');
var router = express.Router();
var user = require('../model/register_schema');
var app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
    res.render('login', {});
});

router.get('/register', function (req, res, next) {
    res.render('register', {});
});

router.post('/login', function (req, res, next) {
/*    user.findOne({username: req.body.username}, function (err, logindata) {
        if (err) {
            console.log(err)
        }
        else if (req.body.username === logindata.username) {
            console.log("Alrady username exists");
            res.redirect('/users/register');
        }
        else {*/
            var newUser = user(req.body);
            newUser.save(function (err, newtable) {
                if (err)
                    console.log(err);
                else
                    res.render('login', {});
                res.redirect('/users/login');
            });
/*        }
    });*/
});
module.exports = router;
