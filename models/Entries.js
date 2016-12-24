var mongoose = require('mongoose');

var EntriesSchema = new mongoose.Schema({
	// guestName: { type: String, require: true },
	// datePublished: datePublished,
	logEntry: { type: String, require: true }

});

var Entries = mongoose.model('Entries', EntriesSchema);

module.exports = Entries;


