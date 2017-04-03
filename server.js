var express = require('express');
var request = require('request');
var session = require("express-session");
var mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/airbnb-like' , function(err) {

  if (err) { throw err; }

});

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(
 session({
  secret: 'a4f8071f-c873-4447-8ee2',
  resave: false,
  saveUninitialized: false,
 })
);

var userSchema = mongoose.Schema({
    login: String,
    password: String,
  });

var UserModel = mongoose.model('User', userSchema);



app.get('/', function (req, res) {
      res.render('home');
});

app.get('/find', function (req, res) {
      res.render('find');
});

app.get('/hote', function (req, res) {
      res.render('hote');
});

 var isLog = false;

app.get('/login', function (req, res) {

 res.render('login');
 });

app.get('/register', function (req, res) {

  var user = new UserModel ({
        login: req.query.email,
        password: req.query.password
    });

    user.save(function (error, user) {
      res.redirect('/');
    });

});

app.get('/register-form', function (req, res) {
  res.render('register');
  });

app.listen(80, function () {
  console.log("Server listening on port 80");
});
