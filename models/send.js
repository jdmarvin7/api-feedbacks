const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');

const schema = new Schema({
    SendUsername: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    InboxUsername: {
        type: Schema.Types.String, ref: 'User',
        required: true
    },


    pontoMelhorar: {
        type: 'string',
        required: true
    },
    pontoManter: {
        type: 'string',
        required: true,
    },
    sugestoes: {
        type: 'string',
        required: true,
    },
    feedbackFinal: {
        type: 'string',
        required: true,
    },
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    update_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Send', schema);