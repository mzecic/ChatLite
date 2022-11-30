const Message = require('../../models/message');
const Inbox = require('../../models/inbox');

module.exports = {
    create,
    show,
    index
}

async function create(req, res) {
    const { senderId, content} = req.body
    console.log(req.body)
    // const message = new Message({ senderId, content });
    // const messageSave = await message.save();
    const inbox = await Inbox.findOne({ _id: req.params.inboxId });
    inbox.messages.push(req.body);
    await inbox.save();
    res.json(inbox);
}

async function show(req, res) {
    const { inboxId } = req.params;
        const result = await Message.find({ inboxId });
        res.json(result);
}

async function index(req, res) {
    const messages = await Message.find({});
    res.json(messages);
}
