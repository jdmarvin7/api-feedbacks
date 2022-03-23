const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Send = require('../models/send');

const schema = new Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    roles: {
        type: 'string',
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
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
    },
    sends: [{
        type: Schema.Types.ObjectId, ref: 'Send'
    }],
    inboxes: [{
        type: Schema.Types.ObjectId, ref: 'Inbox'
    }]
});

module.exports = mongoose.model('User', schema);