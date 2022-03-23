const express = require('express');
const { getSends, updateSends, deleteSends } = require('../controllers/send');
const { sendAndInbox } = require('../controllers/user');
const { authrize } = require('../services/auth')

const router = express.Router();

router.get('/',authrize, getSends);

router.post('/enviar', authrize, sendAndInbox);

router.put('/:id',authrize, updateSends);

router.delete('/:id', deleteSends);
/*
router.get('/:id', getUserById);
router.post('/new', createUser);
router.post('/verification', authenticate);*/

module.exports = router;