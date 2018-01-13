// Require mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	headline : {
		type: String,
		required: true,
		unique: true
	},
	summary :{
		type: String
	},
	link : {
		type: String
	},
	byline : {
		type: String
	},
	saved_flag : {
		type: Boolean,
		default: false
	},
	notes : [{
		type: Schema.Types.ObjectId,
		ref: "Note"	
	}]
});

var Article = mongoose.model("Article",ArticleSchema);

// Export Article model
module.exports = Article;