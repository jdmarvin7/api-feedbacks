const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    idInboxUsername: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    InboxUsername: {
        type: Schema.Types.String, ref: 'User',
    },
    idSendUsername: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    SendUsername: {
        type: Schema.Types.String, ref: 'User',
    },
    pontoMelhorar: {
        type: Schema.Types.String, ref: 'Send',
        required: true
    },
    pontoManter: {
        type: Schema.Types.String, ref: 'Send',
        required: true,
    },
    sugestoes: {
        type: Schema.Types.String, ref: 'Send',
        required: true,
    },
    feedbackFinal: {
        type: Schema.Types.String, ref: 'Send',
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

module.exports = mongoose.model('Inbox', schema);