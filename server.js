//File: server.js

//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request");
var exphbs = require('express-handlebars');

//SQL database set up
//######################
//Unnecessary, using mongoDB
//######################

//Pull in the cheerio scraping tool
var cheerio = require("cheerio");

//Pull in all models (mongodb for this app)
var db = require("./models");

//set port
var PORT = process.env.PORT || 3000;

//set up express instance
var app = express();

//require body-parser
app.use(bodyParser.urlencoded({extended: true}));

//set up static routes in express
app.use(express.static("public"));

//Connect to Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/news-scraper";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

//set up handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Routes: pull in routes from external file
require("./routes/routes") (app);

//Start the server
app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
});

//export express instance
module.exports = app;
//module.exports = db; //can I have multiple exports in the same file... we'll find out