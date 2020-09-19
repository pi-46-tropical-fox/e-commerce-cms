let request;
if(process.env.NODE_ENV == 'development'){
    request = require('supertest');
}
const app = require("../app");
const { User } = require('../models')


// afterAll((done) => {
//     if (process.env.NODE_ENV === 'test') {
//         User.destroy({ truncate: true })
//             .then(() => {
//                 done()
//             })
//             .catch(err => {
//                 done(err)
//             })
//     }
// })


describe('REGSITER', () => {
    describe('Register //SUCCESS', function() {
        it('tests whether respond body should have message, email and id', function(done) {
            const dummyUser = {
                email: 'dummy@mail.com',
                password: '12345678',
                role: 'admin'
            }
            request(app)
                .post('/register')
                .send(dummyUser)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('message', 'Register succeeded')
                    expect(res.body).toHaveProperty('id', expect.any(Number))
                    expect(res.body).toHaveProperty('email', dummyUser.email)
                    expect(res.body).not.toHaveProperty('password')
                    done()
                })
        })
    })

    describe('Register //FAIL', () => {
        it('tests whether email format is invalid', function(done) {
            const dummyUser = {
                email: 'dummymail.com',
                password: '12345678',
                role: 'admin'
            }
            const expectedError = ['Invalid Email Format']
            request(app)
                .post('/register')
                .send(dummyUser)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then((res) => {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    expect(res.body.errors).toEqual(expectedError)
                    done()
                })

        })
        it('tests whether password length is invalid', (done) => {
            const dummyUser = {
                email: 'dummy@mail.com',
                password: '178',
                role: 'admin'
            }
            const expectedError = ['Password must contain min. 6 and max. 100 characters']
            request(app)
                .post('/register')
                .send(dummyUser)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then((res) => {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    expect(res.body.errors).toEqual(expectedError)
                    done()
                })

        })
    })
})

describe('LOGIN', () => {
    describe('Login //SUCCESS', () => {
        it('expects that respond messages would include email, id and access token',
            (done) => {
                const admin = {
                    email: 'admin@mail.com',
                    password: `123456`
                }
                request(app)
                    .post('/login')
                    .send(admin)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .then((res) => {
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('access_token', expect.any(String))
                        expect(res.body).toHaveProperty('message', 'Login succeeded')
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.body).toHaveProperty('email', admin.email)
                        expect(res.body).not.toHaveProperty('password')
                        done()
                    })
            })
    })

    describe('Login //FAIL', () => {
        it(' expects that req.body would include email and password',
            (done) => {
                const dummyUser = {
                    email: 'hlahlahla@mail.com',
                    password: 'testes'
                }
                const expectedError = ['Email or Password is invalid']
                request(app)
                    .post('/login')
                    .send(dummyUser)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .then(function(res) {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expectedError)
                        done()
                    })
            })

        it('expects that email and password must be filled',
            (done) => {
                const dummyUser = {
                    email: '',
                    password: ''
                }
                const expectedError = ['Each of the following forms must be filled']
                request(app)
                    .post('/login')
                    .send(dummyUser)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .then(function(res) {
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expectedError)
                        done()
                    })
            })

    })
})