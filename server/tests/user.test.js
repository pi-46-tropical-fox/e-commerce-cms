const request = require('supertest')
const app = require('../app')
describe('test User login POST /login', () => {
  it('Test success login responds with json', (done) => {
    request(app)
      .post('/login')
      .send({email: "admin@mail.com", password: "enkripsi123"})
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
      .send({email: 'admin@mail.com', password: '12345'})
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