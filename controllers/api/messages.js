const Message = require('../../models/message');

module.exports = {
    create,
    show,
}

async function create(req, res) {
    const {inboxId, senderId, content} = req.body
    const message = new Message({ inboxId, senderId, content });
    try {
        const result = await message.save();
        res.json(result);
    } catch(err) {
        res.status(500).json(err);
    }
}

async function show(req, res) {
    const { inboxId } = req.params;

    try {
        const result = await Message.find({ inboxId });
        res.json(result);
    } catch(err) {
        res.status(500).json(err);
    }
}
