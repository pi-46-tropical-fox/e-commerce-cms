const request = require('supertest')
const app = require('../../app.js')

describe('Test /auth/login Success Case', () => {
    test('success case, no input error', (done) => {
        request(app)
            .post('/auth/login')
            .send({ email: 'bla@mail.com', password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status } = response
                expect(status).toBe(200)
                done()
            })
    })
})

describe('Test /auth/login Fail Case', () => {
    test('Empty Email, green mean it works', (done) => {
        request(app)
            .post('/auth/login')
            .send({ email: '', password: '12345' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status } = response
                expect(status).toBe(401)
                done()
            })
    })

    test('Empty Password, green mean it works', (done) => {
        request(app)
            .post('/auth/login')
            .send({ email: 'bla@mail.com', password: '' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status } = response
                expect(status).toBe(401)
                done()
            })
    })

    test('Empty Email, Empty Password, green mean it works', (done) => {
        request(app)
            .post('/auth/login')
            .send({ email: '', password: '' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status } = response
                expect(status).toBe(401)
                done()
            })
    })

    test('Right Email, Wrong Password, green mean it works', (done) => {
        request(app)
            .post('/auth/login')
            .send({ email: 'bla@mail.com', password: '1234' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status } = response
                expect(status).toBe(401)
                done()
            })
    })

    test("Email Doens't Exist, green mean it works", (done) => {
        request(app)
            .post('/auth/login')
            .send({ email: 'doesnt@exist.com', password: '1234' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status } = response
                expect(status).toBe(401)
                done()
            })
    })
})