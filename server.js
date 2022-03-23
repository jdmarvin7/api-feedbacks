const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { generateToken, decodeToken, authrize } = require('./services/auth');
const app = require('./index');
const Send = mongoose.model('Send');
const Inbox = mongoose.model('Inbox');
const { transporter } = require('./services/email');


const getUserById = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    }catch(err){
        console.log(err);
    }
}

const createUserAndSend = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        /*
        transporter.sendMail({
            from: 'jdmarvinmaeldestin02@gmail.com',
            to: user.email,
            subject: 'Cadastrado com sucesso!',
            html: '<h1 style="color:green; text-align:center;">Seja Bem-vindo!!!</h1>'
        }, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); */

        try {
            const send = await Send.create({
                username: user._id,
                sendUsername: req.body.sends[0].sendUsername,
                pontoMelhorar: "pontoMelhorar",
                pontoManter: "Acreditar em si mesmo",
                sugestoes: "Para de si cobrar demais",
                feedbackFinal: "Você é brabo!"
            })
            await Send.save;
        } catch (err){
            console.log(err);
            res.status(404).json({ 
                message: "Error saving"
            })
        }

        try {
            const inbox = await Inbox.create({
                username: user._id,
                sendUsername: req.body.sends[0].sendUsername,
                pontoMelhorar: "pontoMelhorar",
                pontoManter: "Acreditar em si mesmo",
                sugestoes: "Para de si cobrar demais",
                feedbackFinal: "Você é brabo!"
            })
            await Send.save;
        } catch (err){
            console.log(err);
            res.status(404).json({ 
                message: "Error saving"
            })
        }

        res.status(201).send({
            message: 'Usuário Cadastrado com sucesso!',
        });

    }catch(err){
        console.log(err);

        res.status(500).send('Falha na requicisão!');
    }
}

const sendNew = async (req, res, next) => {
    const user = User.findOne({ username: 'jdmarvin7' })
        .populate('sends')
        .exec((err, user) => {
            if (err) return handleError(err);
            console.log(user.sends[0].body);
        })

    res.status(200).send(user)
}

module.exports = { createUserAndSend };