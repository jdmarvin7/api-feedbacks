const express = require('express');
const { getInboxes, deleteInboxes } = require('../controllers/inbox')
const { sendAndInbox } = require('../controllers/user');

const router = express.Router();

router.get('/', getInboxes);

router.post('/inboxes', sendAndInbox);

router.delete('/:id', deleteInboxes);

/*
router.get('/:id', getUserById);
router.post('/new', createUser);
router.post('/verification', authenticate);*/

module.exports = router;