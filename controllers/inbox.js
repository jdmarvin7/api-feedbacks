
const mongoose = require('mongoose');
const Inbox = mongoose.model('Inbox');

const getInboxes = async (req, res) => {
    const inboxes = await Inbox.find();
    res.status(200).send(inboxes);
}

const deleteInboxes = async (req, res) => {
    try {
        await Inbox.deleteOne(req.body.id);
        res.status(200).send('Mensagem deletado com sucesso!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error!!!');
    }
}

const createInbox = async (req, res) => {
    const inbox = await Inbox.create({
        
    })
}

module.exports = { getInboxes, deleteInboxes };