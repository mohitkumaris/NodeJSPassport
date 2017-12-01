/**
 * Created by Mohit Kumar on 11/24/2017.
 */
var express= require("express");
var app= express();
var port=process.env.port || 8080;
var mongoose=require("mongoose");
var passport=require("passport");
var flash=require("connect-flash");

var morgan=require("morgan");
var cookieParser=require("cookie-parser");
var bodyParser=require("body-parser");
var session=require("express-session");

var configDB=require("./config/database");

// configuration ===============================================================
mongoose.connect(configDB.url);

// set up our express application

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine','ejs'); // set up ejs for templating


// required for passport

app.use(session({secret:"mohitkumaris"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================================================
require('./app/models/routes')(app,passport);

// launch ======================================================================
app.listen(port);
console.log("The server started" +port);