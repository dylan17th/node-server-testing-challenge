const express = require('express');
const server = express();
const usersRouter = require('../users/users-router.js')

server.use(express.json());
server.use('/api/users', usersRouter);

server.get('/', (req,res)=>{
    res.status(200).json({message : 'api running from server'})
})

module.exports = server;
