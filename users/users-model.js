const db = require('../data/db-config.js');

module.exports = {
    getUsers,
    createUser,
    deleteUser
}

function getUsers(){
    return db('users')
}

function createUser(user){
    return db('users').insert(user);
}

function deleteUser(){
    return null;
}