var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	logroomIds: [],
});

var User = mongoose.model('User', UserSchema);

module.exports = User;


