const express = require('express');
const server = express();
const restricted = require('../auth/auth-restriced-middleware');
const authRouter = require('../auth/authRouter');
const recipesRouter = require('../recipes/recipesRouter');

server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/recipes', restricted, recipesRouter);


module.exports = server;