var express = require('express');
var router = express.Router();
var session = require('express-session');
var app = express();
var user = require('../model/register_schema');
/*var sendmail = require('sendmail')();*/
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
    var tex = 'New task has added';
/*    sendmail({
        from : 'anilrajverma1996@gmail.com',
        to : 'noreplycheck87@gmail.com',
        subject : text,
        html: 'Mail of test sendmail',
    }, function (err, reply) {
        console.log(err && err.stack);
        console.log("sending mail");
        console.log(reply);
    });*/
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "noreplycheck87@gmail.com",
            pass: "qwertyuiop!@"
        }
    });
    var mailOptions={
        to : '201452033@iiitvadodara.ac.in',
        subject : 'task added',
        text : tex
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
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
