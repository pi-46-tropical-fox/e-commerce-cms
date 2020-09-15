const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

const userData = {
    email: 'test@mail.com',
    password: 'testing'
}

afterAll((done) => {
    queryInterface.bulkDelete('Users')
    .then(() => done())
    .catch(err => {
        done()
    })
})

// SUCCESS
describe('POST /register - User Registration', () => {
    it('Test success register responds with json', (done) => {
        request(app)
        .post('/register')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(201)
            expect(body).toHaveProperty('email', userData.email)
            expect(body).toHaveProperty('id', expect.any(Number))
            done()
        })
    })
})

describe('POST /login - User Login', () => {
    it('Test success login responds with json', (done) => {
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('email', userData.email)
            expect(body).toHaveProperty('role', expect.any(String))
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })
})

// FAILED
describe('POST /login - User Login', () => {
    it('Failed login - wrong password', (done) => {
        request(app)
        .post('/login')
        .send({
            email: userData.email,
            password: '4321'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toEqual({errors: ['Wrong email/password']})
            done()
        })
    })
})

describe('POST /login - User Login', () => {
    it('Failed login - unidentified email', (done) => {
        request(app)
        .post('/login')
        .send({
            email: 'wrongemail@mail.com',
            password: '4321'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toEqual({errors: ['Wrong email/password']})
            done()
        })
    })
})

describe('POST /login - User Login', () => {
    it('Failed login - not entering email and password', (done) => {
        request(app)
        .post('/login')
        .send({
            email: '',
            password: ''
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toEqual({errors: ['Email/password cannot be empty']})
            done()
        })
    })
})