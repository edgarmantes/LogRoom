var mongoose = require('mongoose');

var EntriesSchema = new mongoose.Schema({
	// _id: ##;
	guestName: { type: String, require: true },
	guestId: Number,
	datePublished: Number,
	message: { type: String, require: true }

});

var Entries = mogoose.model('Entries', EntriesSchema);

module.exports = Entries;


