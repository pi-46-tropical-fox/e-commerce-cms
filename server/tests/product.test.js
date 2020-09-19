const app = require('../app')
const request = require('supertest')

const { sequelize, User } = require('../models')
const { userCredentials, userData } = require('../tests/config')

const jwt = require('jsonwebtoken')

let access_token = ''
let createdId = 0

beforeAll(async (done) => {
    try{
        const data = await User.create(userData)
        access_token = jwt.sign({id:data.id, email:data.email}, 'rahasia')

        done()
    } catch(err){
        console.log(err)
        done()
    }
})

describe('test post /products', () => {
    it('should return a product object containing the id', (done) => {
        request(app)
            .post('/products')
            .send({ name : 'Kuaci', price : 2000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : 0 })
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                expect(body.id).toEqual(expect.any(Number))
                expect(status).toBe(201)

                createdId = body.id

                done()
            })
    })

    it('should error validation', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name : 'Kuaci', image_url : '', stock : 0 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status} = response
                expect(status).toBe(400)
                done()
            })
    })

    it('should not accept negative values', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name : 'Kuaci', image_url : 'a', stock : -2, price : -2000 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status} = response
                expect(status).toBe(400)
                done()
            })
    })
})

describe('get /products by id', () => {
    it('should return product', (done) => {
        request(app)
            .get(`/products/${createdId}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const {body, status} = response
                expect(body.id).toEqual(expect.any(Number))
                
                expect(status).toBe(200)
                done()
            })
    })

    it('should 404', (done) => {
        request(app)
            .get(`/products/99999999`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const {body, status} = response
                
                expect(status).toBe(404)
                done()
            })
    })
})


describe('test put /products', () => {
    it('should return updated product', (done) => {
        request(app)
            .put(`/products/${createdId}`)
            .set('access_token', access_token)
            .send({ name : 'Kuaci', price : 5000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : 555 })
            .then(response => {
                const {body, status} = response

                console.log(body)

                expect(body.name).toBe('Kuaci')
                expect(body.price).toBe(5000)
                expect(body.stock).toBe(555)

                expect(status).toBe(200)

                done()
            })
    })

    it('should return updated product', (done) => {
        request(app)
            .put(`/products/${createdId}`)
            .set('access_token', access_token)
            .send({ name : 'Kuaci', price : 5000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : 555 })
            .then(response => {
                const {body, status} = response

                console.log(body)

                expect(body.name).toBe('Kuaci')
                expect(body.price).toBe(5000)
                expect(body.stock).toBe(555)

                expect(status).toBe(200)

                done()
            })
    })

})

describe('test delete /products/:id', () => {
    it('should delete the data', (done) => {
        request(app)
            .delete(`/products/${createdId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body, status} = response
                expect(status).toBe(200)
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
