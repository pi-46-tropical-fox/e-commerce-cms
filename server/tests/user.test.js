const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

afterAll(() => {
    queryInterface.bulkDelete('Users')
    .then(() => done())
    .catch(err => done(err))
})

describe('test user register, POST /register', () => {
    it('test success register responds with json', (done) => {
        request(app)
        .post('/register')
        .send({email: 'budi@mail.com', password: '12345', role: 'admin'})
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        // .expect(201)
        // .end((err,res) => {
        //     if (err) return done(err)
        //     done()
        // })
        .then(response => {
            const {body,status} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('email','budi@mail.com')
            expect(body).toHaveProperty('msg','registration successful')
            done()
        })
    })
})

describe('test user login, POST /login', () => {
    it('test success login, responds with json', (done) => {
        request(app)
        .post('/login')
        .send({email: 'budi@mail.com', password: '12345'})
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        // .expect(201)
        // .end((err,res) => {
        //     if (err) return done(err)
        //     done()
        // })
        .then(response => {
            const {body,status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token')
            done()
        })
    })
    it('test failed login with wrong password', (done) => {
        request(app)
        .post('/login')
        .send({email: 'budi@mail.com', password: 'xxxxxx'})
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        // .expect(201)
        // .end((err,res) => {
        //     if (err) return done(err)
        //     done()
        // })
        .then(response => {
            const {body,status} = response
            expect(status).toBe(400)
            expect(body).not.toHaveProperty('access_token')
            done()
        })
    })
    it('test failed login, no email in db', (done) => {
        request(app)
        .post('/login')
        .send({email: 'joko@mail.com', password: 'xxxxxx'})
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        // .expect(201)
        // .end((err,res) => {
        //     if (err) return done(err)
        //     done()
        // })
        .then(response => {
            const {body,status} = response
            expect(status).toBe(401)
            expect(body).not.toHaveProperty('access_token')
            done()
        })
    })
    it('test failed login, providing no email & password', (done) => {
        request(app)
        .post('/login')
        .send({email: '', password: ''})
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        // .expect(201)
        // .end((err,res) => {
        //     if (err) return done(err)
        //     done()
        // })
        .then(response => {
            const {body,status} = response
            expect(status).toBe(401)
            expect(body).not.toHaveProperty('access_token')
            done()
        })
    })
})