const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/db-config.js');

describe('testing the /users endpoint', ()=>{
    beforeEach(async function (){
        await db('users').truncate();
    })
    describe('testing the post for users', ()=>{
        it('returns a 201 status code', () => {
            return request(server)
            .post('/api/users')
            .send({name: 'dylan', password: 'password1'})
            .then(res => {
                expect(res.status).toBe(201)
            })
        });
        it('returns a successfully added message', ()=>{
            return request(server)
            .post('/api/users')
            .send({name: 'dylan', password: 'password1'})
            .then(res => {
                expect(res.body.message).toBe('user added successfully')
            })
        });
        it('adds the user to test.db3', async ()=> {
            const insertedUser = await db('users').where({name: 'dylan'})
            expect(insertedUser).toHaveLength(0);
            await request(server)
            .post('/api/users')
            .send({name: 'dylan', password: 'password1'})
            .then(res => {
                expect(res.body.message).toBe('user added successfully')
            })
            const afterCreation = await db('users')
            expect(afterCreation).toHaveLength(1)
        });
    });
    describe('testing the delete at /api/users', ()=>{
        it('should return a status code of 204',()=>{
            return request(server)
            .delete('/api/users/:id')
            .then(res => {
                expect(res.status).toBe(204)
            })
        });
        it('should a message saying the user was deleted', ()=>{
            return request(server)
            .delete('/api/users/:id')
            .then(res => {
                expect(res.body).toEqual({})
            })
        });
        it('should delete user from database', async ()=> {
            const insertedUser = await db('users').where({name: 'dylan'})
            expect(insertedUser).toHaveLength(0);
            await request(server)
            .post('/api/users')
            .send({name: 'dylan', password: 'password1'})
            .then(res => {
                expect(res.body.message).toBe('user added successfully')
            })
            const afterCreation = await db('users')
            expect(afterCreation).toHaveLength(1)
            await request(server)
            .delete('/api/users/'+1)
            .then( res => {
                expect(res.status).toBe(204)
            })
            const afterdeletion = await db('users')
            expect(afterdeletion).toHaveLength(0)
        });
    })
});