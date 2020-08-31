const request = require('supertest');
const server = require('../api/server');
const Users = require('../database/db-model');
const db = require('../database/dbConfig');

describe('recipesRouter', () => {

  

    describe('get /allRecipes', () => {
      let res = {};
  
            beforeAll(async () => {
                await db('user').truncate();
        
                await request(server).post('/api/auth/register').send({ username: 'Lebron James', password: 'TheKing23'});
        
                const user = await request(server).post('/api/auth/login').send({username: 'Lebron James',password: 'TheKing23'});
        
                token = user.body.token;

                res = await request(server).get('/api/recipes/allRecipes').set('Authorization', `Bearer ${token}`);
            });
  
      it('returns a status of 200', async () => {
        expect(res.status).toBe(200);
      });
  
      it('uses a type of json', () => {
        expect(res.type).toBe('application/json');
      });
    });

    describe('post /recipes', () => {

        let res = {};
  
            beforeAll(async () => {
                await db('user').truncate();

                await db('recipes').truncate();
        
                await request(server).post('/api/auth/register').send({ username: 'Lebron James', password: 'TheKing23'});
        
                const user = await request(server).post('/api/auth/login').send({username: 'Lebron James',password: 'TheKing23'});
        
                token = user.body.token;

                res = await request(server).post('/api/recipes').set('Authorization', `Bearer ${token}`).send({
                                    title: 'Impossible Burgers',
                                    source: 'Myself',
                                    ingredients: 'Impossible plant meat, burger buns, chipotle-mayo sauce',
                                    instructions: 'Cook the meat for 5-8 mins each side, serve on buns with mayo',
                                    private: false,
                                    user_id: 1
                });
            });

            it('should return a status of 200', () => {
                expect(res.status).toEqual(200);
            });


    })


    describe('put /recipes/:id', () => {

        let res = {};
  
            beforeAll(async () => {
                await db('user').truncate();

                await db('recipes').truncate();
        
                await request(server).post('/api/auth/register').send({ username: 'Lebron James', password: 'TheKing23'});
        
                const user = await request(server).post('/api/auth/login').send({username: 'Lebron James',password: 'TheKing23'});
        
                token = user.body.token;

                const recipe =  await request(server).post('/api/recipes').set('Authorization', `Bearer ${token}`).send({
                                    title: 'Impossible Burgers',
                                    source: 'Myself',
                                    ingredients: 'Impossible plant meat, burger buns, chipotle-mayo sauce',
                                    instructions: 'Cook the meat for 5-8 mins each side, serve on buns with mayo',
                                    private: false,
                                    user_id: 1       
                });

                res = await request(server).put(`/api/recipes/${recipe.id}`).set('Authorization', `Bearer ${token}`).send({
                                    title: 'Impossible Burgerssss',
                                    source: 'Myself',
                                    ingredients: 'Impossible plant meat, burger buns, chipotle-mayo sauce',
                                    instructions: 'Cook the meat for 5-8 mins each side, serve on buns with mayo',
                                    private: false,
                                    user_id: 1    
                })

            });

            it('should return a status of 200', () => {
                expect(res.status).toEqual(200);
            });


    })


    describe('delete /recipes/:id', () => {

        let res = {};
  
            beforeAll(async () => {
                await db('user').truncate();

                await db('recipes').truncate();
        
                await request(server).post('/api/auth/register').send({ username: 'Lebron James', password: 'TheKing23'});
        
                const user = await request(server).post('/api/auth/login').send({username: 'Lebron James',password: 'TheKing23'});
        
                token = user.body.token;

                const recipe =  await request(server).post('/api/recipes').set('Authorization', `Bearer ${token}`).send({
                                    title: 'Impossible Burgers',
                                    source: 'Myself',
                                    ingredients: 'Impossible plant meat, burger buns, chipotle-mayo sauce',
                                    instructions: 'Cook the meat for 5-8 mins each side, serve on buns with mayo',
                                    private: false,
                                    user_id: 1       
                });

                res = await request(server).delete(`/api/recipes/${recipe.id}`).set('Authorization', `Bearer ${token}`)

            });

            it('should return a status of 200', () => {
                expect(res.status).toEqual(200);
            });


    })

  });