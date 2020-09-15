const request = require('supertest')
const app = require('../app')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')
const userData = {email: 'amanda@mail.com', password: '123456', role: 'admin'}
const userDataCustomer = {email: 'amanda2@mail.com', password: '123456', role: 'customer'}
const productData = {name:'Nike Pigeot', image_url:'http://nike.com', price:100000, stock:3, category:'fashion'}
const updatedProduct = {name: 'Updated Name', image_url: 'Updated Image Url', price: 100, stock: 100, category: 'Updated Category'}
const productDataBlank = {name:'', image_url:'', price:'', stock:'', category:''}
const productDataString = {name:'Nike Pigeot', image_url:'http://nike.com', price:'stringPrice', stock:'stringStock', category:'fashion'}
const productDataMinus = {name:'Nike Pigeot', image_url:'http://nike.com', price:-1, stock:-1, category:'fashion'}
let access_token = ''
let access_tokenCustomer = ''
let productId = null

afterAll((done) => {
    Promise.all[
        queryInterface.bulkDelete('Users')
            .then(() => done())
            .catch((err) => done()),
        
        queryInterface.bulkDelete('Products')
            .then(() => done())
            .catch((err) => done())
    ]
})

beforeAll((done) => {
    Promise.all[
        User.create(userData)
            .then(user => {
                access_token = generateToken(user)
                done()
            })
            .catch(err => done()),
        
        User.create(userDataCustomer)
            .then(user => {
                access_tokenCustomer = generateToken(user)
                done()
            })
            .catch(err => done())
    ]
})


describe('Test add product POST /products', function() {
    it('Test success, products response with json', function(done) {
        request(app)
            .post('/products')
            .send(productData)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('name', productData.name)
                expect(body).toHaveProperty('image_url', productData.image_url)
                expect(body).toHaveProperty('price', productData.price)
                expect(body).toHaveProperty('stock', productData.stock)
                expect(body).toHaveProperty('category', productData.category)
                productId = body.id
                done()
            })
    })

    it('Test failed, products response with json, without access_token', function(done) {
        request(app)
            .post('/products')
            .send(productData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                expect(body.errors[0]).toEqual('User not authenticated!')
                done()
            })
    })

    it('Test failed, products response with json, role is not admin', function(done) {
        request(app)
            .post('/products')
            .send(productData)
            .set('access_token', access_tokenCustomer)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                expect(body.errors[0]).toEqual('User not authenticated!')
                done()
            })
    })

    it('Test failed, blank input for required data', function(done) {
        request(app)
            .post('/products')
            .send(productDataBlank)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Name is required!')
                expect(body.errors[1]).toEqual('Image Url is required!')
                expect(body.errors[2]).toEqual('Price is required!')
                expect(body.errors[4]).toEqual('Stock is required!')
                expect(body.errors[6]).toEqual('Category is required!')
                done()
            })
    })

    it('Test failed, Price & Stock using data string', function(done) {
        request(app)
            .post('/products')
            .send(productDataString)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Price must be a number!')
                expect(body.errors[1]).toEqual('Stock must be a number!')
                done()
            })
    })

    it('Test failed, Price & Stock using negative value', function(done) {
        request(app)
            .post('/products')
            .send(productDataMinus)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Validation min on price failed')
                expect(body.errors[1]).toEqual('Validation min on stock failed')
                done()
            })
    })

})


describe('Test update product PUT /products/:id', function() {
    it('Test success, update products response with json', function(done) {
        request(app)
            .put(`/products/${productId}`)
            .send(updatedProduct)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Update sucessfully!')
                done()
            })
    })

    it('Test failed, update products response with json, without access_token', function(done) {
        request(app)
            .put(`/products/${productId}`)
            .send(updatedProduct)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                expect(body.errors[0]).toEqual('User not authenticated!')
                done()
            })
    })

    it('Test failed, update products response with json, role is not admin', function(done) {
        request(app)
            .put(`/products/${productId}`)
            .send(updatedProduct)
            .set('access_token', access_tokenCustomer)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                expect(body.errors[0]).toEqual('User not authenticated!')
                done()
            })
    })

    it('Test failed, update products with blank input for required data', function(done) {
        request(app)
            .put(`/products/${productId}`)
            .send(productDataBlank)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                console.log(response.body, "<< ini nih")
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Name is required!')
                expect(body.errors[1]).toEqual('Image Url is required!')
                expect(body.errors[2]).toEqual('Price is required!')
                expect(body.errors[4]).toEqual('Stock is required!')
                expect(body.errors[6]).toEqual('Category is required!')
                done()
            })
    })

    it('Test failed, update Price & Stock using data string', function(done) {
        request(app)
            .put(`/products/${productId}`)
            .send(productDataString)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Price must be a number!')
                expect(body.errors[1]).toEqual('Stock must be a number!')
                done()
            })
    })

    it('Test failed, update Price & Stock using negative value', function(done) {
        request(app)
            .put(`/products/${productId}`)
            .send(productDataMinus)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body.errors[0]).toEqual('Validation min on price failed')
                expect(body.errors[1]).toEqual('Validation min on stock failed')
                done()
            })
    })

})


describe('Test delete product DELETE /products/:id', function() {
    it('Test failed, delete products, without access_token', function(done) {
        request(app)
            .delete(`/products/${productId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                expect(body.errors[0]).toEqual('User not authenticated!')
                done()
            })
    })

    it('Test failed, delete products, role ist not admin', function(done) {
        request(app)
            .delete(`/products/${productId}`)
            .set('access_token', access_tokenCustomer)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                expect(body.errors[0]).toEqual('User not authenticated!')
                done()
            })
    })

    it('Test success, delete products', function(done) {
        request(app)
            .delete(`/products/${productId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Delete sucessfully!')
                done()
            })
    })

})