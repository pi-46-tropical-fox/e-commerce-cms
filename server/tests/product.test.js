const app = require('../app')
const request = require('supertest')

const { sequelize, User } = require('../models')
const { userCredentials, userData, customerData } = require('../tests/config')

const jwt = require('jsonwebtoken')

let access_token = ''
let customer_access_token = ''
let createdId = 0

beforeAll(async (done) => {
    try{
        const data = await User.create(userData)
        const newCustomerData = await User.create(customerData)
        access_token = jwt.sign({id:data.id, email:data.email}, 'rahasia')
        customer_access_token = jwt.sign({ id : newCustomerData.id, email : newCustomerData.email }, 'rahasia')
        
        done()
    } catch(err){
        console.log(err)
        done()
    }
})

describe('test post /products success', () => {
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
})

describe('test post /products fail', () => {
    it('jwt token not provided - should be unauthorized', (done) => {
        request(app)
        .post('/products')
        .send({ name : 'Kuaci', price : 2000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : 0 })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(401)
            expect(body.errors).toEqual(expect.arrayContaining(['User not Authenticated']))

            done()
        })
    })

    it('jwt token is not an admin token - should be unauthorized', (done) => {
        request(app)
        .post('/products')
        .send({ name : 'Kuaci', price : 2000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : 0 })
        .set('Accept', 'application/json')
        .set('access_token', customer_access_token)
        .expect('Content-Type', /json/)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(403)

            expect(body.errors).toEqual(expect.arrayContaining(['Forbidden']))

            done()
        })
    })

    it('required fields not filled - should error validation', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name : 'Kuaci' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body, status} = response
                expect(body.errors).toEqual(expect.arrayContaining(["Product.image_url cannot be null", "Product.price cannot be null", "Product.stock cannot be null"]))

                expect(status).toBe(400)
                done()
            })
    })

    it('stock filled with negative values - should error validation', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name : 'Kuaci', image_url : 'a', stock : -2, price : 2000 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body,status} = response
                expect(body.errors).toEqual(expect.arrayContaining(['Validation min on stock failed']))

                expect(status).toBe(400)
                done()
            })
    })

    it('price filled with negative values - should error validation', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name : 'Kuaci', image_url : 'a', stock : 20, price : -2000 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body,status} = response
                expect(body.errors).toEqual(expect.arrayContaining(['Validation min on price failed']))

                expect(status).toBe(400)
                done()
            })
    })

    it('fields filled with different data types - should error validation', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name : 'a', image_url : 'a', stock : 'adsdsa', price : 2000 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body,status} = response

                expect(body.errors).toEqual(expect.arrayContaining(["invalid input syntax for type integer: \"adsdsa\""]))

                expect(status).toBe(400)
                done()
            })
    })

    it('should not allow empty names', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({ name : '', image_url : 'a', stock : -2, price : -2000 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body,status} = response
                console.log(body)

                expect(body.errors).toEqual(expect.arrayContaining(['Validation min on price failed']))

                expect(status).toBe(400)
                done()
            })
    })
})

describe('get /products by id success', () => {
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

                expect(body.errors).toEqual(expect.arrayContaining(['Not found']))
                expect(status).toBe(404)
                done()
            })
    })
})


describe('test put /products success', () => {
    it('should return updated product', (done) => {
        request(app)
            .put(`/products/${createdId}`)
            .set('access_token', access_token)
            .send({ name : 'Kuaci', price : 5000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : 555 })
            .then(response => {
                const {body, status} = response

                expect(body.name).toBe('Kuaci')
                expect(body.price).toBe(5000)
                expect(body.stock).toBe(555)

                expect(status).toBe(200)

                done()
            })
    })
})

describe('test put /products fail', () => {
    it('no jwt provided - should be unauthorized', (done) => {
        request(app)
            .put(`/products/${createdId}`)
            .send({ name : 'Kuaci', price : 5000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : 555 })
            .then(response => {
                const {body, status} = response

                expect(status).toBe(401)
                
                done()
            })
    })


    it('fields filled with different data types - should error validation', (done) => {
        request(app)
            .put(`/products/${createdId}`)
            .set('access_token', access_token)
            .send({ name : 'a', image_url : 'a', stock : 'adsdsa', price : 2000 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body,status} = response

                expect(body.errors).toEqual(expect.arrayContaining(["invalid input syntax for type integer: \"adsdsa\""]))

                expect(status).toBe(400)
                done()
            })
    })

    it('customer jwt provided - should be forbidden', (done) => {
        request(app)
            .put(`/products/${createdId}`)
            .set('access_token', customer_access_token)
            .send({ name : 'Kuaci', price : 5000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : 555 })
            .then(response => {
                const {body, status} = response

                expect(status).toBe(403)
                
                done()
            })
    })

    it('stock filled with minus value - should return validation error', (done) => {
        request(app)
            .put(`/products/${createdId}`)
            .set('access_token', access_token)
            .send({ name : 'Kuaci', price : 5000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : -555 })
            .then(response => {
                const {body, status} = response
                expect(body.errors).toEqual(expect.arrayContaining(['Validation min on stock failed']))
                
                expect(status).toBe(400)

                done()
            })
    })

    it('price filled with minus value - should return validation error', (done) => {
        request(app)
            .put(`/products/${createdId}`)
            .set('access_token', access_token)
            .send({ name : 'Kuaci', price : -5000, image_url : 'https://cdn2.thecatapi.com/images/a57.jpg', stock : 555 })
            .then(response => {
                const {body, status} = response
                expect(body.errors).toEqual(expect.arrayContaining(['Validation min on price failed']))
                
                expect(status).toBe(400)

                done()
            })
    })
})

describe('test delete /products/:id success', () => {
    it('should delete the data', (done) => {
        request(app)
            .delete(`/products/${createdId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body, status} = response
                expect(body.message).toBe('Data deleted')

                expect(status).toBe(200)
                done()
            })
    })
})


describe('test delete /products/:id fail', () => {
    it('invalid id given - should not found', (done) => {
        request(app)
            .delete(`/products/999999`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {body, status} = response

                expect(body.errors).toEqual(expect.arrayContaining(['Not found']))
                expect(status).toBe(404)
                done()
            })
    })

    it('jwt not provided - should be unauthorized', (done) => {
        request(app)
            .delete(`/products/${createdId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status} = response

                expect(status).toBe(401)
                done()
            })
    })
    it('customer jwt provided - should be forbidden', (done) => {
        request(app)
            .delete(`/products/${createdId}`)
            .set('access_token', customer_access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status} = response

                expect(status).toBe(403)
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
