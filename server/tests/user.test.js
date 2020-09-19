const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')
const userData = {email: 'amanda@mail.com', password: '123456'}
const userData2 = {email: 'amanda2@mail.com', password: '123456', role:'admin'}
const userDataFailed = {email: 'amanda', password: '123'}
const userDataBlank = {email: '', password: ''}
let access_token = ''

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(() => done())
        .catch(err => done())
})

beforeAll((done) => {
    User.create(userData2)
        .then(user => {
            access_token = generateToken(user)
            done()
        })
        .catch(err => done())
})

describe('Test user registration POST /register', function() {
    it('Test success, register response with json', function(done) {
        request(app)
            .post('/register')
            .send(userData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('email', userData.email)
                expect(body).toHaveProperty('message', 'Has been successfully registered!')
                done()
            })
    })

    it('Test failed, register response with json, not using email format && password less than 6 characters', function(done) {
        request(app)
            .post('/register')
            .send(userDataFailed)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Email must use email format!')
                expect(body.errors[1]).toEqual('password min 6 characters')
                done()
            })
    })

    it('Test failed, registerwith blank email format && password', function(done) {
        request(app)
            .post('/register')
            .send(userDataBlank)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Email is required!')
                expect(body.errors[2]).toEqual('Password is required!')
                done()
            })
    })
})


describe('Test user login POST /login', function() {
    it('Test success, login response with json', function(done) {
        request(app)
            .post('/login')
            .send(userData2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', access_token)
                expect(body).toHaveProperty('message', 'Success to login!')
                done()
            })
    })

    it('Test failed, login response with json, wrong password', function(done) {
        request(app)
            .post('/login')
            .send({email: userData2.email, password: '1234567'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Invalid name or password')
                done()
            })
    })

    it('Test failed, login response with json, wrong email', function(done) {
        request(app)
            .post('/login')
            .send({email: 'vionamp@mail.com', password: userData2.password})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Invalid name or password')
                done()
            })
    })

    it('Test failed, login with blank email & password', function(done) {
        request(app)
            .post('/login')
            .send(userDataBlank)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                console.log(response.body, "<<ini nih")
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Invalid name or password')
                done()
            })
    })

    it('Test failed, login response with json, not input email and password', function(done) {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(500)
                expect(body.errors[0]).toEqual('WHERE parameter "email" has invalid "undefined" value')
                done()
            })
    })
})