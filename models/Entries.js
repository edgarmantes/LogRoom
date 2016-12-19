var mongoose = require('mongoose');

var EntriesSchema = new mongoose.Schema({
	// _id: ##;
	// guestName: { type: String, require: true },
	// guestId: Number,
	// datePublished: Number,
	logEntry: { type: String, require: true }

});

var Entries = mongoose.model('Entries', EntriesSchema);

module.exports = Entries;


