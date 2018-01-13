// Require mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
	text : {
		type: String,
		required: true
	}
});

var Note = mongoose.model("Note",NoteSchema);

// Export Note model
module.exports = Note;