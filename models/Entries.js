var mongoose = require('mongoose');

var EntriesSchema = new mongoose.Schema({
	logRoomId: { type: String, require: true },
	datePublished: { type: String, require: true },
	logEntry: { type: String, require: true }

});

var Entries = mongoose.model('Entries', EntriesSchema);

module.exports = Entries;


