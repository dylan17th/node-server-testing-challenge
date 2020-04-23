const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/db-config.js');

describe('testing server.js', ()=>{
    describe('testing the GET /', ()=>{
        it('should return a 200 status', ()=>{
            return request(server)
            .get('/')
            .then(res => expect(res.status).toBe(200))
        })
        it('should retru api running from server', ()=>{
            return request(server)
            .get('/')
            .then(res => expect(res.body.message).toBe('api running from server'))
        })
    })
})