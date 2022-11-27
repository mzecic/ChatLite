const express = require('express')
const router = express.Router();
const inboxCtrl = require('../../controllers/api/inbox')

router.post('/', inboxCtrl.create);
router.get('/:id', inboxCtrl.index);
router.get('/detail/:firstId/:secondId', inboxCtrl.show);
router.get('/users/:id', inboxCtrl.getSecondUser);
router.delete('/:id', inboxCtrl.delete);

module.exports = router;
