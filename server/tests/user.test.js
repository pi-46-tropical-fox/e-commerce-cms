const request = require('supertest');
const app = require('../app');
const {sequelize} = require('../models')
const {queryInterface} = sequelize


const userData = {email: 'john@mail.com', password: '123456'}

afterAll((done) => {
    queryInterface.bulkDelete('Users')
    .then(() => done())
    .catch(err => {
        done()
    })
  });

describe('User Registration Test POST /register', function() {
    it('success register and return new object and status 201', function(done) {
    request(app)
    .post('/register')
    .send(userData)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
        const {body,status} =response
        expect(status).toBe(201)
        expect(body).toHaveProperty('email', userData.email)
        expect(body).toHaveProperty('message', 'Has been successfully registered')
        done()
        })
    .catch(err => {
        done()
    })
    });
});


describe('User Login Test POST /login', function() {
    test('success login and return new token,email, and status 200', function(done) {
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} =response
            expect(status).toBe(200)
            expect(body).toHaveProperty('email', userData.email)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
            })
        .catch(err => {
            done()
        })
    });
});


