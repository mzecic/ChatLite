const Inbox = require('../../models/inbox');
const User = require('../../models/user');

module.exports = {
    create,
    index,
    show,
    getSecondUser,
}

async function create(req, res) {
    const newInbox = new Inbox({
        users: [req.body.senderId, req.body.receiverId]
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

async function getSecondUser(req, res) {
    try {
        const secondUser = await User.find({ _id: req.params.id })
        res.json(secondUser);
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }
}
