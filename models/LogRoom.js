
var mongoose = require('mongoose')
, Schema = mongoose.Schema;
var Entries = require('./Entries')

var LogRoomSchema = new mongoose.Schema({
    dateCreated: { type: String, required: true },
    roomName: String, 
    hostId: { type: String, required: true },
    entries: [ { type: Schema.Types.ObjectId, ref: 'Entries' } ]
});

var LogRoom = mongoose.model('LogRoom', LogRoomSchema);

module.exports = LogRoom;
