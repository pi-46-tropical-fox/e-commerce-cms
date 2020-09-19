const { text } = require('express')
const request = require('supertest')
const app = require('../app')

const userData = {email: 'admin1@gmail.com', password: '123456'}

describe('test user login POST /users/login', function() {
    test('Test success login respond with json', function(done) {
        request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body, status, statusCode} = response
            // console.log(response, 'ini response login')
            expect(statusCode).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })

    test('Test failed login wrong password', function(done) {
        request(app)
        .post('/users/login')
        .send({email:'admin1@gmail.com', password: '654321'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body, status, statusCode} = response
            // console.log(response, 'ini response login')
            expect(statusCode).toBe(400)
            expect(body).toHaveProperty('message', 'invalid email/password')
            done()
        })
    })

    test('Test email not registered', function(done) {
        request(app)
        .post('/users/login')
        .send({email:'admin0@gmail.com', password: '654321'})
        // .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body, status, statusCode} = response
            // console.log(body, 'ini response body login')
            expect(status).toBe(400)
            body.forEach(errText => {
                expect(errText).toBe('invalid email/password')
            })
            done()
        })
    })

    test('Test login with empty email and password', function(done) {
        request(app)
        .post('/users/login')
        .send({email:'', password: ''})
        // .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body, status, statusCode} = response
            // console.log(body, 'ini response body login')
            expect(status).toBe(400)
            body.forEach(errText => {
                expect(errText).toBe('invalid email/password')
            })
            done()
        })
    })
})