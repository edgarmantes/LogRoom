
var mongoose = require('mongoose')
, Schema = mongoose.Schema;
var Entries = require('./Entries')

var LogRoomSchema = new mongoose.Schema({
		// _id : ##
    dateCreated: { type: String, required: true },
    Id: String, 
    guestsIdsAccepted: String,
    hostId: { type: String, required: true },
    entries: [{ type: Schema.ObjectId, ref: 'Entries' }]
});

var LogRoom = mongoose.model('LogRoom', LogRoomSchema);

module.exports = LogRoom;
