const request = require('supertest')
const app = require('../app')

const userData = {email: 'admin1@mail.com', password: '123456'}

describe('User endpoints', function () {
    it('Success login as admin', (done) => {
        request(app)
        .post('/users/login')
        .send(userData)
        .then(res => {
            const {body, status} = res
            // console.log(res, '>>>> ini di res test');
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })


    // Fail Login

    it('Fail login as admin because wrong password', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: 'admin1@mail.com',
            password: 'salah'
        })
        .then(res => {
            const {body, status} = res
            // console.log(res.body, '<<<<< fail login');
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Invalid email or password')
            done()
        })
    })


    it('Fail login as admin because email doesnt exist', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: 'emailnot@exist.com',
            password: '123456'
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(404)
            expect(body).toHaveProperty('message', 'Email doesnt exists')
            done()
        })
    })


    it('Fail login as admin because email doesnt exist', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: '',
            password: ''
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(404)
            expect(body).toHaveProperty('message', 'Email doesnt exists')
            done()
        })
    })
})