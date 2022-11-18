const express = require('express')
const router = express.Router();
const messagesCtrl = require('../../controllers/api/messages');

router.post('/', messagesCtrl.create);
router.get('/:inboxId', messagesCtrl.show);


module.exports = router;
