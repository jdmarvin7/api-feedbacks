// Imports
const express = require('express');
const http = require('http');
//const debug = require('debug')('api-senac:index');

const cors = require('cors')
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
require('dotenv').config();

const corsOptions = {
    exposedHeaders: ['x-access-token']
};


// models
const User = require('./models/user'); 
const Inbox = require('./models/inbox');
const Send = require('./models/send');

// App settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
mongoose.connect(process.env.DB_CONNECT_KEY);

// Routers Imports
const userRouter = require('./routes/user');
const inboxRouter = require('./routes/inbox');
const sendRouter = require('./routes/send');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


// Rotas
app.use('/users', userRouter);
app.use('/inboxes', inboxRouter);
app.use('/sends', sendRouter);

app.get('/', (req, res) => {
    res.send({
        message: 'API FEEDBACKS',
        version: '0.0.1'
    })
})


// Server
const server = http.createServer(app);
console.log('Server runing!');

server.listen(PORT);

module.exports = app;