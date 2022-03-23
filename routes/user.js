const express = require('express');
const { getUser, updateUser, createUser, authenticate, getUserById, deleteUser } = require('../controllers/user');
const { createUserAndSend } = require('../server');

const router = express.Router();

router.get('/', getUser);
router.get('/:id', getUserById);

router.put('/update/:id', updateUser);

router.post('/signup', createUser);
router.post('/login', authenticate);

router.delete('/:id', deleteUser);


module.exports = router;