var express = require('express');
var router = express.Router();
var session = require('express-session');
var app = express();
var user = require('../model/register_schema');
var nodemailer = require('nodemailer');

var expressOptions = {
    secret: "secret",
    saveUninitialized: false,
    resave: true
};

router.use(session(expressOptions));

/*router.use(function (req, res, next) {
    res.locals.session = req.session.userData;
    next();
});*/

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index1', {});
});

router.get('/index', function (req, res,next) {
    res.render('index', {});
})

router.post('/login', function (req, res, next){
    user.findOne({username:req.body.username}, function (err, logindata) {
        if (err)
            console.log(err);
        else if (req.body.username === logindata.username && req.body.password === logindata.password)
        {
            var sess = req.session;
            sess.userData = logindata;
            //alert('successfully login');
            res.render('index', {});
            res.redirect('/index');
        }
        else
            console.log("invalid username or password");
    });

});

router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err)
            res.send(err);

        res.redirect('/');

    });
});

router.get('/todo', function (req, res, next) {
/*    user.find({todo: { $exists: true }}, function (err, data)*/
    id = req.session.userData._id;
    user.findById(id, function(err, data) {
        if (err)
            console.log(err)
        //console.log(data[0].todo);
        res.send(data);
    })

});

router.post('/do', function (req, res, next) {
    console.log("helo");
    id = req.session.userData._id;
    user.findById(id, function(err, data) {
        var arr = [];
        arr = data.todo;
        arr.push(req.body.todo);
        //console.log(data);
        //console.log(req.body)
        if (err)
            console.log(err)
        /*data.todo = req.body.test;*/
       data.update({todo:arr}, function(err){
           if (err)
               console.log(err);
       });
    });
    //console.log(req);
    res.redirect('/notify');
    //res.send("hello word");
});

router.get('/notify', function (req, res, next) {
   console.log('have to Notify');
/*    user.find({email: { $exists: true }}, function (err, data){
        if (err)
            console.log(err)
        console.log(data[0].email)
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'noreplycheck87@gmail.com', // Your email id
                pass: 'qwertyuiop!@' // Your password
            }
        });
        var text = 'New task has added \n\n';

        var mailOptions = {
            from: 'noreplychech87@gmail.com', // sender address
            to: '201452033@iiitvadodara.ac.in' , // list of receivers
            subject: 'New Task', // Subject line
            text: text //, // plaintext body
            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });
    })*/
});
/*
router.post('/', function (req,res,next) {
    var newTodo = toDo(req.body);
    newTodo.save(function (req, res, next){
       if (err)
           console.log(err)
        res.render('index', {});
        //res.redirect('/');
    });

});*/

console.log("Listening on port 3000");

module.exports = router;
