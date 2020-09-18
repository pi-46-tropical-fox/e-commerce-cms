const app = require('../app')
const request = require('supertest')

const { sequelize, User } = require('../models')
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

describe('test post /products', () => {
    it('should return a product object containing the id', (done) => {
        request(app)
            .post('/products')
            .send({ name : 'Kuaci', price : 2000, })
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
})

// describe('test get /products by id', () => {
//     it('should return a product object containing the id', (done) => {
//         // request(app)
//         //     .post('/products')
//         //     .send(userCredentials)
//         //     .set('Accept', 'application/json')
//         //     .expect('Content-Type', /json/)
//         //     .then(response => {
//         //         const {body, status} = response
//         //         expect(status).toBe(200)
//         //         expect(body).toHaveProperty('email', userCredentials.email)
//         //         expect(body).toHaveProperty('access_token', expect.any(String))
//         //         done()
//         //     })
//     })
// })

// describe('test get /products', () => {
//     it('should return array of products', (done) => {
//         request(app)
//             .get('/products')
//             .set('access_token', access_token)
//         // request(app)
//         //     .post('/user/login')
//         //     .send(userCredentials)
//         //     .set('Accept', 'application/json')
//         //     .expect('Content-Type', /json/)
//         //     .then(response => {
//         //         const {body, status} = response
//         //         expect(status).toBe(200)
//         //         expect(body).toHaveProperty('email', userCredentials.email)
//         //         expect(body).toHaveProperty('access_token', expect.any(String))
//         //         done()
//         //     })
//     })
// })

afterAll((done) => {
    User.destroy({
        where: {},
        truncate: true
    }).then(() => done())
    .catch(err => done())

    // queryInterface.bulkDelete('Users', null)
    // .then(done)
    // .catch(err => done())
})
