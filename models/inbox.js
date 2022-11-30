const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    inboxId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    content: {
        type: String,
    }
}, {
    timestamps: true,
})


const inboxSchema = new Schema({
    users: {
        type: Array,
    },
    messages: [messageSchema]
}, {
    timestamps: true,
})

module.exports = mongoose.model('Inbox', inboxSchema)
