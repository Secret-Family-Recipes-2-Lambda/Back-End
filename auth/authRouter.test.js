const server = require('../api/server');
const request = require('supertest');
const db = require('../data/db-config');
const cryptoRandomString = require('crypto-random-string');

const randomString = cryptoRandomString({length: 10});

console.log('randomString' , randomString)


describe('server.js', () => {
    it('checks that we are using the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
});


describe('post /auth/register', () => {
    let res = {};

    beforeAll(async () => {
        await db('user').truncate();
        res = await request(server).post('/api/auth/register').send({username: randomString, password: randomString})
        console.log(res)
    });

    it('uses a type of json', () => {
        expect(res.type).toBe('application/json')
    })

});



describe('post /api/auth/login', () => {
    beforeAll(async () => {
      res = await request(server).post('/api/auth/login').send(
          {username: randomString.toString(), password: randomString});
          console.log('login', res.body)
    });


    it('should return a JSON object', () => {
      expect(res.type).toBe('application/json');
    });
  });


 