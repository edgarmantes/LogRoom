var mongoose = require('mongoose');

var LogRoomSchema = new mongoose.Schema({
	// _id : ##
    dateCreated: { type: Number, required: true },
    invitedGuestId: Number,
    guestsIdsAccepted: Number,
    hostId: { type: Number, required: true },
    entries: [{ type: Schema.ObjectId, ref: 'Entries' }]
});

var LogRoom = mongoose.model('LogRoom', LogRoomSchema);

module.exports = LogRoom;
