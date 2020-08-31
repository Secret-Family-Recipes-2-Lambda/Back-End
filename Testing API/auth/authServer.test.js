const request = require('supertest');
const server = require('../api/server');
const Users = require('../database/db-model');
const db = require('../database/dbConfig');



describe('server.js', () => {
    it('checks that we are using the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});


describe('post /auth/register', () => {
    let res = {};

    beforeAll(async () => {
        await db('user').truncate();
        res = await request(server).post('/api/auth/register').send(
            {username: 'Lebron James', password: 'TheKing23'})
    });

    it('checks that the status is 201', () => {
        expect(res.status).toBe(201)
    });

    it('uses a type of json', () => {
        expect(res.type).toBe('application/json')
    })
});



describe('post /api/auth/login', () => {
    beforeAll(async () => {
      res = await request(server).post('/api/auth/login').send(
          {username: 'Lebron James', password: 'TheKing23'});
    });

    it('should return 200', () => {
      expect(res.status).toBe(200);
    });

    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });
  });
