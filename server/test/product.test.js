const request = require('supertest')
const app = require('../app')
const { generateToken } = require('../helpers/jwt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')
const productData = {name: 'aa', image_url: 'a.com', price: 1, stock: 1}
const userData = {email: 'user@mail.com', password: '123'}
let access_token = ''
let productId

afterAll((done)=>{
    return queryInterface.bulkDelete('Products')
    .then(()=> done())
    .catch((err)=> {
        done()
    })
})

beforeAll((done)=> {
    User.create(productData)
    .then((done) => {
        access_token = generateToken(userData)
        done()
    })
    .catch(err => {
        done()
    })
})

describe('test Get Product GET /product', function() {
    it('Test Success show products responds with json', function(done) {
        request(app)
        .get('/products')
        .set('acces_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            const {body, status} = response
            expect(status).toBe(200)
            done()
        })
    })
})

describe('test Add Product POST /product', function() {
    it('Test Success add Product responds with json', function(done) {
        request(app)
        .post('/products')
        .set('acces_token', access_token)
        .send(productData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then(response => {
            const {body, status} = response
            productId = response.body.id
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', productData.name)
            expect(body).toHaveProperty('image_url', productData.image_url)
            expect(body).toHaveProperty('price', productData.price)
            expect(body).toHaveProperty('stock', productData.stock)
            done()
        })
    })
})

describe('test show Product by Id GET /product/:productId', function() {
    it('Test Success show Product by Id responds with json', function(done) {
        request(app)
        .get(`/products/${productId}`)
        .set('acces_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            const {body, status} = response
            expect(status).toBe(200)
            done()
        })
    })
})

describe('test Update Product Put /product', function() {
    it('Test Success Update Product by id responds with json', function(done) {
        request(app)
        .put(`/products/${productId}`)
        .set('acces_token', access_token)
        .send({name: 'bb', image_url: 'b.com', price: 1, stock: 1})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            const {body, status} = response
            expect(status).toBe(200)
            done()
        })
    })
})

describe('test delete product DELETE /product/:productId', function() {
    it('Test Success delete Product by Id responds with json', function(done) {
        request(app)
        .delete(`/products/${productId}`)
        .set('acces_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            const {body, status} = response
            expect(status).toBe(200)
            done()
        })
    })
})