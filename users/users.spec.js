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
});