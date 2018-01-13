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

mongoose.connect("mongodb://lodalhost/mongonewsscrape");

var db = mongoose.connection;

db.on("error",function(error) {
	console.log("Mongoose Error: ", error);
});

db.once("open",function() {
	console.log("Mongoose connection successful ");
})
var routes = ("./controllers/article-controller.js");
app.use("/",routes);

app.listen(port,function() {
	console.log("Listening on " + port);
})