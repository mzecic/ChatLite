const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inboxSchema = new Schema({
    users: {
        type: Array,
    }
}, {
    timestamps: true,
})

module.export = mongoose.model('Inbox', inboxSchema)
