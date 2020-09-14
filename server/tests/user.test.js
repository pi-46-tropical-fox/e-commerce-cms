const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

afterAll((done) => {
  queryInterface.bulkDelete('Users')
  .then(()=> done())
  .catch(err => {
    done()
  })
})

describe('test User registration POST /register', function() {
  it('Test success register responds with json', (done) => {
    request(app)
      .post('/register')
      .send({email: 'john@mail.com', password: '123456'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('email', 'john@mail.com')
        done()
    })
  })
})

describe('test User login POST /login', () => {
  it('Test success login responds with json', (done) => {
    request(app)
      .post('/login')
      .send({email: 'john@mail.com', password: '123456'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
    })
  })
})

describe('test User login POST /login', () => {
  it('Test login fail with wrong password responds with json', (done) => {
    request(app)
      .post('/login')
      .send({email: 'john@mail.com', password: '12345'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'invalid email or password')
        done()
    })
  })
})

describe('test User login POST /login', () => {
  it('Test login fail with wrong email responds with json', (done) => {
    request(app)
      .post('/login')
      .send({email: 'wrongemail@mail.com', password: '123456'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'invalid email or password')
        done()
    })
  })
})

describe('test User login POST /login', () => {
  it('Test login fail with empty email and password responds with json', (done) => {
    request(app)
      .post('/login')
      .send({email: '', password: ''})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'invalid email or password')
        done()
    })
  })
})