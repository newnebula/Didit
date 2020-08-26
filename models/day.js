var mongoose = require('mongoose');
var DaySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    reflection: { type: String, required: false },
    didits: [ {type : mongoose.Schema.ObjectId, ref : 'Didit'} ],
    date: {
        type: String,
        default: ((new Date()).toString()).substring(0,15)
    }
});

var Day = mongoose.model('Day', DaySchema);
module.exports = Day;