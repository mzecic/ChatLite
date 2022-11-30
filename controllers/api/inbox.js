const Inbox = require('../../models/inbox');
const User = require('../../models/user');

module.exports = {
    create,
    index,
    show,
    getSecondUser,
    delete: deleteInbox,
    get
}

async function create(req, res) {
    const newInbox = new Inbox({
        users: [req.body[0][0], req.body[0][1]],
        messages: []
    });
        const result = await newInbox.save();
        res.json(result);

}

async function index(req, res) {
        const inbox = await Inbox.find({
            users: {$in: [req.params.id]}
        });
        res.json(inbox);
}

async function show(req, res) {
        const inbox = await Inbox.findOne({
            users: {$all: [req.params.firstId, req.params.secondId]}
        })
        res.json(inbox);
}

async function getSecondUser(req, res) {
        const secondUser = await User.find({ _id: req.params.id })
        res.json(secondUser);
}

async function deleteInbox(req, res) {
    const result = await Inbox.findOneAndDelete({ _id: req.params.id });
    res.json(result);

}

async function get(req, res) {
    // const inbox = Inbox.findOne({ _id: req.params.inboxId });
    // res.json(inbox);
}
