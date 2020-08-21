const express = require('express');
const server = express();
const restricted = require('../auth/auth-restriced-middleware');
const authRouter = require('../auth/authRouter');
const recipesRouter = require('../recipes/recipesRouter');
const cors = require('cors');

server.use(cors());
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/recipes', restricted, recipesRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'Api is running'})
});

module.exports = server;