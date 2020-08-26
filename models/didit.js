const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const diditSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
           type: String,
           required: true
    },
    days: {
        type:[Date],
        default:[]
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
            type: Schema.Types.ObjectId,
            ref:'user'
    }
});

const Didit = mongoose.model('Didit', diditSchema);

module.exports = Didit;