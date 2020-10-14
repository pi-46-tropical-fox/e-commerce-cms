const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize


const userData = {
    name: 'doel',
    email: 'doel@mail.com',
    password: '123456',
    role: 'admin'
}

afterAll ( done => {
    queryInterface.bulkDelete('Users')
        .then( () => done())
        .catch( err => {
            done()
        })
})

describe(' test user registration POST /register ', () => {
    it('responds with json', function(done) {
        request(app)
          .post('/register')
          .send(userData)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then(response => {
            const { status, body } = response

            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', userData.name)
            expect(body).toHaveProperty('email', userData.email)
            done()

        })
    });
})

describe(' test success login POST /login ', () => {
    it('responds with json', function(done) {
        request(app)
          .post('/login')
          .send({email:userData.email, password:userData.password})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then(response => {
            const { status, body } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('email', userData.email)
            done()

        })
    });
})

describe(' test fail login POST /login ', () => {
    it('responds with json', function(done) {
        request(app)
          .post('/login')
          .send({email:userData.email, password:'1234'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then(response => {
            const { status, body } = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors', ['Invalid email or password'])
            done()

        })
    });
})

describe(' test fail login POST /login ', () => {
    it('responds with json', function(done) {
        request(app)
          .post('/login')
          .send({email:'unkknown@mail.com', password:'1234'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then(response => {
            const { status, body } = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors', ['Invalid email or password'])
            done()

        })
    });
})

describe(' test fail login POST /login ', () => {
    it('responds with json', function(done) {
        request(app)
          .post('/login')
          .send({email:'', password:''})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then(response => {
            const { status, body } = response
            
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors', ['Invalid email or password'])
            done()

        })
    });
})