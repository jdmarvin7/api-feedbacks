const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { generateToken, decodeToken, authrize } = require('../services/auth');
const app = require('../index');
const Send = mongoose.model('Send');
const Inbox = mongoose.model('Inbox');

const getUser = async (req, res, next) => {
    try{
        const user = await User.find();
        res.status(200).send(user);
    }catch(err){
        console.log(err);
    }
}

const getUserById = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    }catch(err){
        console.log(err);
    }
}

const updateUser = async(req, res, next) => {
    try{
     await User.updateOne(req.body.id, req.body);
     res.status(200).send('User atualizado com sucesso!');
    }catch(err){
        console.log(err);
    }
}


const createUser = async (req, res, next) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            roles: req.body.roles,
        })
        await User.save;

        res.status(201).send({
            message: 'Usuário Cadastrado com sucesso!',
            nomeDoUsuario: req.body.nome
        });

    }catch(err){
        console.log(err);

        res.status(500).send('Falha na requicisão!');
    }
}

const authenticate = async (req, res, next) => {
    try {
        let user = await User.findOne({
            username: req.body.username,
        });
       
        if(!user) {
            res.status(404).send({ error: 'Usuário não encontrado!'});
            return;
        }

        const findPassword = bcrypt.compareSync(req.body.password, user.password); 
        
        if(!findPassword) {
            res.status(401).json({ error: 'Senha não encontrado' });
            return;
        }
        
        const token = await generateToken({ 
            id: user._id,
            username: user.username,
            email: user.email, 
            password: user.password 
        });

        res.header('autorization-token', token);
        
        res.status(201).send({ 
            token: token,
            data: {
                id: user._id,
                nome: user.username,
                email: user.email,
            }
        });
    }catch(err){
        console.log(err);

        res.status(500).send({ error: 'Falha na requicisão!' });
    }
}

const deleteUser = async(req, res, next) => {
    try{
     await User.deleteOne(req.body.id);
     res.status(200).send('User deletado!');
    }catch(err){
        console.log(err);

        res.status(500).send({ error: 'Falha na requicisão!'});
    }
}

const sendAndInbox = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const data = await decodeToken(token);

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
                SendUsername: data.id,
                InboxUsername: user.username,
                pontoMelhorar: req.body.sends[0].pontoMelhorar,
                pontoManter: req.body.sends[0].pontoManter,
                sugestoes: req.body.sends[0].sugestoes,
                feedbackFinal: req.body.sends[0].feedbackFinal
            })
            await Send.save;
        } catch (err){
            console.log(err);
            res.status(404).json({ 
                message: "Error saving"
            })
        }

        /*
        
        */
        res.status(201).send({
            message: 'Mensagem enviado com sucesso!',
        });

    }catch(err){
        console.log(err);

        res.status(500).send('Falha na requicisão!');
    }
}


module.exports = { getUser, updateUser, createUser, authenticate, getUserById, deleteUser, sendAndInbox };