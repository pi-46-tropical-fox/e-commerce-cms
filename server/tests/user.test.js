const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

const userData = {
    email: 'test@mail.com',
    password: 'testing',
    access_token: ''
}

afterAll((done) => {
    queryInterface.bulkDelete('Users', {role: {[Sequelize.Op.not]: [1]}})
    .then(() => done())
    .catch(err => {
        done()
    })
})

// SUCCESS
describe('Test User - Success', () => {
    it('POST /register', (done) => {
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

    it('POST /login', (done) => {
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            console.log(res.body, '<<<<<<<<<<<<<<<');
            const {body, status} = res
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('email', userData.email)
            expect(body).toHaveProperty('role', expect.any(String))
            expect(body).toHaveProperty('access_token', expect.any(String))
            userData.access_token = body.access_token
            done()
        })
    })
})

// FAILED REGISTER
describe('Failed Register', () => {
    it('Email not unique', (done) => {
        request(app)
        .post('/register')
        .send({
            email: userData.email,
            password: '12345678'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toEqual({errors: ['email must be unique']})
            done()
        })
    })

    it('Empty email and password', (done) => {
        request(app)
        .post('/register')
        .send({
            email: '',
            password: ''
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toEqual({errors: ['Invalid email', 'Email cannot be empty', 'Password length must be 4-12 characters', 'Password cannot be empty']})
            done()
        })
    })

    it('Email not valid', (done) => {
        request(app)
        .post('/register')
        .send({
            email: 'test',
            password: '12345678'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toEqual({errors: ['Invalid email']})
            done()
        })
    })

    it('Password length < 4', (done) => {
        request(app)
        .post('/register')
        .send({
            email: 'testfail@mail.com',
            password: '123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toEqual({errors: ['Password length must be 4-12 characters']})
            done()
        })
    })

    it('Password length > 12', (done) => {
        request(app)
        .post('/register')
        .send({
            email: 'testfail@mail.com',
            password: '123456789101112'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(400)
            expect(body).toEqual({errors: ['Password length must be 4-12 characters']})
            done()
        })
    })
})

// FAILED LOGIN
describe('Failed login', () => {
    it('Wrong password', (done) => {
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

    it('Empty email and password', (done) => {
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


// AUTH TEST
// describe('Failed Auth', () => {
//     describe('Failed Authentication', () => {
//         test('No access token provided', done => {
//             request(app)
//             .get('/products')
//             .set('Accept', 'application/json')
//             .set('access_token', '')
//             .expect('Content-Type', /json/)
//             .then(res => {
//                 const {body, status} = res
//                 expect(status).toBe(401)
//                 expect(body).toHaveProperty('errors', ['Access token not provided'])
//                 done()
//             })
//         })

//         test('Invalid access token', done => {
//             request(app)
//             .get('/products')
//             .set('Accept', 'application/json')
//             .set('access_token', 'asd')
//             .expect('Content-Type', /json/)
//             .then(res => {
//                 const {body, status} = res
//                 expect(status).toBe(401)
//                 expect(body).toHaveProperty('errors', ['User not authenticated'])
//                 done()
//             })
//         })
//     })

//     describe('Failed Authorization', () => {
//         test('User is not admin', done => {
//             request(app)
//             .get('/products')
//             .set('Accept', 'application/json')
//             .set('access_token', userData.access_token)
//             .expect('Content-Type', /json/)
//             .then(res => {
//                 const {body, status} = res
//                 expect(status).toBe(403)
//                 expect(body).toHaveProperty('errors', ['User not authorized'])
//                 done()
//             })
//         })
//     })
// })