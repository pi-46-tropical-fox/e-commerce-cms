const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const userData = {email: 'user@mail.com', password: '123'}

afterAll((done)=>{
    return queryInterface.bulkDelete('Users')
    .then(()=> done())
    .catch((err)=> {
        done()
    })
})

describe('test User Registration', function() {
    it('Test Success register responds with json', function(done) {
        request(app)
        .post('/register')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then(response => {
            const {body, status} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('email', userData.email)
            done()
        })
    })
})

describe('test User Login', function() {
    it('Test Success Login responds with json', function(done) {
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            const {body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })
})