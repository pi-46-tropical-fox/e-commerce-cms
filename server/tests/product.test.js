const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

let access_token = ''
let wrong_access_token = ''
let productId = 0

afterAll((done) => {
    queryInterface.bulkDelete('Products')
        .then(() => console.log('deleted products'))
        .catch(err => console.log(err))

    queryInterface.bulkDelete('Users')
        .then(() => done())
        .catch(err => console.log(err))
})

beforeAll((done) => {
    const products = [
        {
            name: 'indomie goreng',
            image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-special_detail_094906814.png',
            price: 1500,
            stock: 200
        },
        {
            name: 'indomie goreng rendang',
            image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-rendang-flavour_detail_114846026.png',
            price: 2000,
            stock: 100
        },
        {
            name: 'indomie goreng ayam panggang',
            image_url: 'http://www.indomie.com/uploads/product/mie-goreng-barbeque-chicken-flavour_detail_170728887.png',
            price: 1750,
            stock: 54
        }
    ]
    User.create({
        email: 'budi@mail.com',
        password: '12345',
        role: 'admin'
    })
        .then(user => {
            access_token = jwt.sign({ id: user.id, email: user.email }, 'indomie')
            wrong_access_token = access_token + 'bbbbbb'
            console.log(wrong_access_token);
            return Product.bulkCreate(products)
        })
        .then(result => done())
        .catch(err => {
            console.log(err);
            done()
        })

    
    
})

describe('test get products, GET /products', () => {
    it('test success get products, responds with json', (done) => {
        request(app)
            .get('/products')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                let expected = { "id": 1, "image_url": "http://www.indomie.com/uploads/product/indomie-mi-goreng-special_detail_094906814.png", "name": "indomie goreng", "price": 1500, "stock": 200 }
                const { body, status } = response
                expect(status).toBe(200)
                done()
            })
    })
})

describe('test create products, POST /products', () => {
    it('test success create products, responds with json', (done) => {
        request(app)
            .post('/products')
            .send({
                name: 'indomie goreng sate',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 1556,
                stock: 267
            })
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                productId = body.id
                expect(status).toBe(200)
                done()
            })
    })
    it('test failed create products, providing no access_token', (done) => {
        request(app)
            .post('/products')
            .send({
                name: 'indomie goreng sate',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 1556,
                stock: 267
            })
            // .set('access_token', access_token)
            .expect('Content-Type', "text/html; charset=utf-8")
            .then(response => {
                const { body, status } = response
                console.log(body);
                expect(status).toBe(500)
                done()
            })
    })
    it('test failed create products, providing wrong access_token', (done) => {
        request(app)
            .post('/products')
            .send({
                name: 'indomie goreng sate',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 1556,
                stock: 267
            })
            .set('access_token', wrong_access_token)
            .expect('Content-Type', "text/html; charset=utf-8")
            .then(response => {
                const { body, status } = response
                console.log(body);
                expect(status).toBe(500)
                done()
            })
    })
    it('test failed create products, incomplete body request', (done) => {
        request(app)
            .post('/products')
            .send({
                name: '',
                image_url: '',
                price: 1556,
                stock: 267
            })
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                done()
            })
    })
    it('test failed create products, negative price', (done) => {
        request(app)
            .post('/products')
            .send({
                name: 'indomie goreng sate',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: -356,
                stock: 543
            })
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                done()
            })
    })
    it('test failed create products, negative stock', (done) => {
        request(app)
            .post('/products')
            .send({
                name: 'indomie goreng sate',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 356,
                stock: -543
            })
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                done()
            })
    })
    it('test failed create products, string on stock & price', (done) => {
        request(app)
            .post('/products')
            .send({
                name: 'indomie goreng sate',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 'odading',
                stock: 'mang oleh'
            })
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                done()
            })
    })
})

describe('test get product by id, GET /products/:id', () => {
    it('test success get products by id, responds with json', (done) => {
        request(app)
            .get(`/products/${productId}`)
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(200)
                done()
            })
    })
})

describe('test edit products, PUT /products/:id', () => {
    it('test success edit products, responds with json', (done) => {
        request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'indomie goreng babi',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 1800,
                stock: 267
            })
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                console.log(body);
                expect(status).toBe(201)
                expect(body).toEqual([1])
                done()
            })
    })
    it('test failed edit products, no access_token', (done) => {
        request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'indomie goreng babi',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 1800,
                stock: 267
            })
            .expect('Content-Type', "text/html; charset=utf-8")
            .then(response => {
                const { body, status } = response
                console.log(body);
                expect(status).toBe(500)
                done()
            })
    })
    it('test failed edit products, wrong access_token', (done) => {
        request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'indomie goreng babi',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 1800,
                stock: 267
            })
            .set('access_token', wrong_access_token)
            .expect('Content-Type', "text/html; charset=utf-8")
            .then(response => {
                const { body, status } = response
                console.log(body);
                expect(status).toBe(500)
                done()
            })
    })
    it('test failed edit products, negative stock', (done) => {
        request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'indomie goreng babi',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: -1800,
                stock: 267
            })
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                done()
            })
    })
    it('test failed edit products, negative price', (done) => {
        request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'indomie goreng babi',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 1800,
                stock: -267
            })
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                done()
            })
    })
    it('test failed edit products, string on stock & price', (done) => {
        request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'indomie goreng babi',
                image_url: 'http://www.indomie.com/uploads/product/indomie-mi-goreng-satay-flavour_detail_115623621.png',
                price: 'rasanya kaya',
                stock: 'jadi iron men'
            })
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                expect(status).toBe(401)
                done()
            })
    })
})

describe('test delete products, DELETE /products/:id', () => {
    it('test success delete products, responds with json', (done) => {
        request(app)
            .delete(`/products/${productId}`)
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { body, status } = response
                console.log(body);
                expect(status).toBe(200)
                expect(body).toEqual({"msg": "success deleting product"})
                done()
            })
    })
    it('test failed delete products, no access_token', (done) => {
        request(app)
            .delete(`/products/${productId}`)
            .expect('Content-Type', "text/html; charset=utf-8")
            .then(response => {
                const { body, status } = response
                console.log(body);
                expect(status).toBe(500)
                done()
            })
    })
    it('test failed delete products, wrong access_token', (done) => {
        request(app)
            .delete(`/products/${productId}`)
            .set('access_token', wrong_access_token)
            .expect('Content-Type', "text/html; charset=utf-8")
            .then(response => {
                const { body, status } = response
                console.log(body);
                expect(status).toBe(500)
                done()
            })
    })
})

