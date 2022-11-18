const Inbox = require('../../models/inbox');

module.exports = {
    create,
    index,
    show,
}

async function create(req, res) {
    const newInbox = new Inbox({
        users: [req.body.senderId, req.bodt.receiverId]
    });

    try {
        const result = await newInbox.save();
        res.json(result)
    } catch(err) {
        res.status(500).json(err)
    }
}

async function index(req, res) {
    try {
        const inbox = await Inbox.find({
            users: {$in: [req.params.id]}
        });
        res.json(inbox);
    } catch(err) {
        res.status(500).json(err)
    }
}

async function show(req, res) {
    try {
        const inbox = await Inbox.findOne({
            users: {$all: [req.params.firstId, req.params.secondId]}
        })
        res.json(inbox);
    } catch(err) {
        res.status(500).json(err)
    }
}
