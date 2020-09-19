const app = require('../app')
const request = require('supertest')

const { sequelize, User } = require('../models')
// const { queryInterface } = sequelize

const { userCredentials, userData } = require('../tests/config')
let access_token = ''

beforeAll((done) => {
    User.create(userData)
    .then(user => {
        access_token = jwt.sign({id:user.id, email:user.email}, 'rahasia')
        done()
    })
    .catch(err =>{
        done()
    })
})

describe('test user post /user/login', () => {
    it('should return an object contains access_token email and id', (done) => {
        request(app)
            .post('/user/login')
            .send(userCredentials)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body, status} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('email', userCredentials.email)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
    })

    it('should give wrong credentials error', (done) => {
        let wrongUserCredentials = userCredentials
        wrongUserCredentials.password = wrongUserCredentials.password + Math.random()

        request(app)
            .post('/user/login')
            .set('Accept', 'application/json')
            .send(wrongUserCredentials)
            .expect('Content-Type', /json/)
            .expect(401)
            .then(response => {
                const {body, status} = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Email/Password combination not found!')
                done()
            })
    })
})


afterAll((done) => {
    User.destroy({
        where: {},
        truncate: true
    }).then(() => done())
    .catch(err => done())
})
