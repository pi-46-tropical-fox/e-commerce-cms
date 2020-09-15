const request = require('supertest');
const app = require('../app');

let user_data = {
    email: 'john@mail.com',
    password: 'secret',
    role: 'customer'

    }

describe('Register / Succes Case', () => {
    test('Should send object with key: message, status-code, id, email', (done) => {
        request(app)
            .post('/register')
            .send(user_data)
            .end(function(err, res) {
                if (err) throw err
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('message','user success to register')
                expect(res.body).toHaveProperty('status-code', 201)
                expect(res.body).toHaveProperty('id', expect.any(Number))
                expect(res.body).toHaveProperty('email', user_data.email)
                expect(res.body).not.toHaveProperty('password')
                done()
            })
    })
})

