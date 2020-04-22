//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption")
// const md5 = require("md5")
// const bcrypt = require("bcrypt")
// const saltRounds = 10;
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")

const app = express();



app.use(express.static("public"));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "The best secret in the world",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true})
mongoose.set("useCreateIndex", true)

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose)

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});


app.post("/register", function(req, res){



//code for auth
  // bcrypt.hash(req.body.password, saltRounds, function(err, hash){
  //   //Store hash in your password DB.
  //   const newUser = new User({
  //     email: req.body.username,
  //     password: hash
  //   });
  //
  //   newUser.save(function(err){
  //     if (err){
  //       console.log(err);
  //     } else{
  //       res.render('secrets');
  //     }
  //   });
  // })

});

app.post("/login", function(req, res){











  // const username = req.body.username;
  // const password = req.body.password;
  //
  // User.findOne({email: username}, function(err, foundUser){
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (foundUser) {
  //       // if (foundUser.password === password) {
  //       bcrypt.compare(password, foundUser.password, function(err, result){
  //         //res == true
  //         if (result === true){
  //           res.render("secrets");
  //
  //         }
  //       })
  //       }
  //     }
  //   })
  });




app.listen(3000, function(){
  console.log("server started");
});
