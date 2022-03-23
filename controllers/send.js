const mongoose = require('mongoose');
const Send = mongoose.model('Send');

const getSends = async (req, res) => {
    const send = await Send.find();
    res.status(200).send(send);
}

const updateSends = async (req, res) => {
    try {
        await Send.updateOne(req.body.id, req.body)
        res.status(200).send('Mensagem atualizado com sucesso!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error!!!');
    }
}

const deleteSends = async (req, res) => {
    try {
        await Send.deleteOne(req.body.id);
        res.status(200).send('Mensagem deletado com sucesso!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error!!!');
    }
}

module.exports = { getSends, updateSends, deleteSends };