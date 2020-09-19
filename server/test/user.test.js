const request = require('supertest')
const app = require('../app')
const {User} = require('../models')

afterAll((done) => {
    if(process.env.NODE_ENV === 'test'){
        User.destroy({truncate: true})
        .then(_ => {
            return done()
        })
        .catch(err => {
            return done(err)
        })
    }
})

let user_data =   {
    firstName: 'Abdul',
    lastName: 'Fattah',
    email: 'abdul@mail.com',
    password: '123456',
    role: 'admin'
  }

describe('Register an account', () => {
    //Success Case
    describe('Success create an account', () => {
        test('Should send object with keys: access_token', (done) => {
            request(app)
                .post('/register')
                .send(user_data)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty('access_token', expect.any(String))
                        expect(res.body).not.toHaveProperty('password')
                        return done()
                    }
                })
        })
    })

    // Failed Case
    describe('Failed create an account', () => {
        describe('Because of an empty first name', () => {
            test('Return statusCode 400 with keys errors', (done) => {
                let emptyFirstname = {...user_data, firstName: ''}
                request(app)
                .post('/register')
                .send(emptyFirstname)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['First name cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
            })
        })
        describe('Because of an empty last name', () => {
            test('Return statusCode 400 with keys errors', (done) => {
                let emptyLastname = {...user_data, lastName: ''}
                request(app)
                .post('/register')
                .send(emptyLastname)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Last name cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
            })
        })
        describe('Because of an empty email', () => {
            test('Return statusCode 400 with keys errors', (done) => {
                let emptyEmail = {...user_data, email: ''}
                request(app)
                .post('/register')
                .send(emptyEmail)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Email cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
            })
        })
        describe('Because of an invalid email format', () => {
            test('Return statusCode 400 with keys errors', (done) => {
                let invalidEmail = {...user_data, email: 'abdulmail.com'}
                request(app)
                .post('/register')
                .send(invalidEmail)
                .end((err, res) => {                   
                    if(err) return done(err)
                    else{
                        const errors = ['Invalid email format']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
            })
        })
        describe('Because of an empty password', () => {
            test('Return statusCode 400 with keys errors', (done) => {
                let emptyPassword = {...user_data, password: ''}
                request(app)
                .post('/register')
                .send(emptyPassword)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Password cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
            })
        })
        describe('Because of password length', () => {
            test('Return statusCode 400 with keys errors', (done) => {
                let passLength = {...user_data, password: '12345'}
                request(app)
                .post('/register')
                .send(passLength)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Password at least 6 characters']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
            })
        })
    })
})

describe('Login to account', () => {
    //Success Case
    describe('Success login', () => {
        test('Should send object with keys: access_token', (done) => {
            request(app)
                .post('/login')
                .send(user_data)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('access_token', expect.any(String))
                        return done()
                    }
                })
        })
    })

    //Fail Login
    describe('Fail login', () => {
        describe('Because of wrong password', () => {
            test('Return statusCode 400 with keys errors', (done) => {
                let wrongPass = {...user_data, password: '12345'}
                request(app)
                    .post('/login')
                    .send(wrongPass)
                    .end((err, res) => {
                        if(err) return done(err)
                        else{
                            const errors = ['Email or Password is incorrect']
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                            return done()
                        }
                    })
            })
            test('Return statusCode 400 with keys errors', (done) => {
                let wrongPass = {...user_data, password: ''}
                request(app)
                    .post('/login')
                    .send(wrongPass)
                    .end((err, res) => {
                        if(err) return done(err)
                        else{
                            const errors = ['Email or Password is incorrect']
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                            return done()
                        }
                    })
            })
        })
        describe('Because of wrong email', () => {
            test('Return statusCode 400 with keys errors', (done) => {
                let wrongEmail = {...user_data, email: 'abdul1@mail.com'}
                request(app)
                    .post('/login')
                    .send(wrongEmail)
                    .end((err, res) => {
                        if(err) return done(err)
                        else{
                            const errors = ['Email or Password is incorrect']
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                            return done()
                        }
                    })
            })
            test('Return statusCode 400 with keys errors', (done) => {
                let wrongEmail = {...user_data, email: ''}
                request(app)
                    .post('/login')
                    .send(wrongEmail)
                    .end((err, res) => {
                        if(err) return done(err)
                        else{
                            const errors = ['Email or Password is incorrect']
                            expect(res.status).toBe(400)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                            return done()
                        }
                    })
            })
        })

    })
})