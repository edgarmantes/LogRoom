var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    entries: { type: Array, required: true }
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;