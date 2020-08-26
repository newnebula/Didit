var mongoose = require('mongoose');
var TokenSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: {type: String, required: true},
    expired: {type: Date, required: true}
});

var TokenSchema = mongoose.model('TokenSchema', TokenSchema);
module.exports = TokenSchema;