// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Database configuration
var mongoose = require("mongoose");
mongoose.Promise = Promise;

// Set Port
var port = process.env.PORT || 3000;

// Initialize express
var app = express();
// Use body-parser
app.use(bodyParser.urlencoded({
	extended : false
}));

// Make public a static dir
app.use(express.static("public"));

// Set Handlebars
var exphbs = require("express-handlebars");
// Setting default view engine to handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

if (process.env.MONGODB_URI) {
	console.log('Connecting to MLAB');
	mongoose.connect("mongodb://heroku_swbfvj3n:7gkr5p0r5nh9eaf9ascd0fs540@ds147711.mlab.com:47711/heroku_swbfvj3n");
}
else {
	mongoose.connect("mongodb://localhost/mongonewsscrape");
}

var db = mongoose.connection;

db.on("error",function(error) {
	console.log("Mongoose Error: ", error);
});

db.once("open",function() {
	console.log("Mongoose connection successful ");
});

// Require article-controller
require ("./controllers/article-controller.js")(app);
// app.use("/",routes);

app.listen(port,function() {
	console.log("Listening on " + port);
})