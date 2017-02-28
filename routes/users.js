var express = require('express');
var router = express.Router();
var user = require('../model/register_schema');

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
    var newUser = user(req.body);
    newUser.save(function (err, newtable){
        if (err)
            console.log(err);
        else
            res.render('login', {});
            res.redirect('/users/login');
    });
});
module.exports = router;
