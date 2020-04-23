const express = require('express');
const router = express.Router();
const Users = require('./users-model.js')

router.get('/', (req,res)=>{
    res.status(200).json({message: 'api running in users endpoints'})
});

router.post('/', (req,res)=>{
    const user = req.body;
    Users.createUser(user)
    .then(userId => {
        res.status(201).json({message: 'user added successfully'})
    })
   .catch(err => {
       res.status(500).json({message: err})
   })
});

router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    Users.deleteUser(id)
    .then(user => {
        res.status(204).end();
    })
    .catch(err => res.status(500).json({message: err}))
});

module.exports = router;