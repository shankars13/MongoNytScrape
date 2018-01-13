// Requiring Article and Note models
var Article = require("../models/article.js");
var Note = require("../models/note.js");

// Scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Routes
// Exporting routes
module.exports = function(app) {	

	// Primary route hit when website loads
	app.get("/", function(req, res) {
		// Get all articles to display 
	  	promiseAllArticles().then(function(allArticlesData) {
	  		// Get saved articles to display count using flashy method with ES6 version of reduce()
	  		var savedArticleCount = allArticlesData.reduce((a, b) => {
	  			// If saved_flag, add 1 else 0
	  			return a + (b.saved_flag ? 1 : 0);
	  		},0);

			// Render index with received data
			res.render("index", 
			{articles: allArticlesData, articleCount: allArticlesData.length, savedCount: savedArticleCount});
	  		
		});
	});

}

// Function to return promise of finding all articles
function promiseAllArticles() {
	// Query to find all from Article 
	var query = Article.find();
	// Return promise
	return query.exec();
}