const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { User, Product } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { queryInterface } = sequelize

const userData = { email: 'admin1@mail.com', password: 'admin', role: 'Admin' }
const notAdmin = { email: 'notadmin@mail.com', password: 'bukanadmin', role: 'Customer' }
let access_token;
let token;

beforeAll((done) => {
    User.create(userData)
    .then(user => {
        access_token = generateToken(user)
        done()
    })
    .catch(err => {
        done()
    })
    User.create(notAdmin)
    .then(user => {
        token = generateToken(user)
        done()
    })
    .catch(err => {
        done()
    })
})

afterAll((done) => {
    // hapus isi database ketika test sudah selesai
    queryInterface.bulkDelete('Products')
    .then(() => done())
    .catch(err => {
        done()
    })

    queryInterface.bulkDelete('Users')
    .then(() => done())
    .catch(err => {
        done()
    })

})

//SUCCESS CRUD PRODUCTS

describe('test success crud products', function() {
    it('TEST SUCCESS POST PRODUCTS RESPONDS WITH JSON', function(done) {
        request(app)
        .post('/products')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 1,
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            // console.log(response);
            // console.log(response.body);
            expect(status).toBe(201)
            expect(response).toHaveProperty("body", expect.any(Object))
            done()
        })
    })
    it('TEST SUCCESS GET PRODUCTS RESPONDS WITH JSON', function(done) {
        request(app)
        .get('/products')
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(200)
            expect(response).toHaveProperty("body", expect.any(Object))
            done()
        })
    })
    it('TEST SUCCESS PUT PRODUCTS RESPONDS WITH JSON', function(done) {
        request(app)
        .put('/products/2')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 2,
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(200)
            expect(response).toHaveProperty("body", expect.any(Object))
            done()
        })

    })
    it('TEST SUCCESS DELETE PRODUCTS RESPONDS WITH JSON', function(done) {
        request(app)
        .delete('/products/2')
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(200)
            done()
        })
    })
})

//FAILED CRUD
//CREATE
describe('test failed crud products', function() {
    it('TEST FAILED WITHOUT ACCESS TOKEN RESPONDS WITH JSON', function(done) {
        request(app)
        .post('/products')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 1,
        })
        .then(response => {
            const { body, status } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Doesnt recognize user..")
            done()
        })

    })
    it('TEST FAILED EMPTY FIELD RESPONDS WITH JSON', function(done) {
        request(app)
        .post('/products')
        .send({
            name: '',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 2,
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body.errors[0]).toHaveProperty("message", "Please fill the field!")
            done()
        })
    })
    it('TEST STOCK FILLED WITH MINUS NUMBER RESPONDS WITH JSON', function(done) {
        request(app)
        .post('/products')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 100000,
            stock: -1,
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body.errors[0]).toHaveProperty("message", "Do not input value under 1!")
            done()
        })
    })
    it('TEST PRICE FILLED WITH MINUS NUMBER RESPONDS WITH JSON', function(done) {
        request(app)
        .post('/products')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: -1,
            stock: 2,
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body.errors[0]).toHaveProperty("message", "Do not input value under 1!")
            done()
        })
    })
    it('TEST STOCK FILLED WITH STRING RESPONDS WITH JSON', function(done) {
        request(app)
        .post('/products')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 'dua',
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body.errors[0]).toHaveProperty("message", "Validation isNumeric on stock failed")
            done()
        })
    })
    it('TEST ACCESS_TOKEN NOT ADMIN RESPONDS WITH JSON', function(done) {
        request(app)
        .post('/products')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 3,
        })
        .set('access_token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(403)
            expect(body).toHaveProperty("message", "You are not an admin!")
            done()
        })
    })
})

//UPDATE

describe('test failed crud products', function() {
    it('TEST FAILED WITHOUT ACCESS TOKEN RESPONDS WITH JSON', function(done) {
        request(app)
        .put('/products/2')
        .send({
            name: 'Moonshot Cushion',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 4,
        })
        .then(response => {
            const { body, status } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Doesnt recognize user..")
            done()
        })

    })
    it('TEST ACCESS_TOKEN NOT ADMIN RESPONDS WITH JSON', function(done) {
        request(app)
        .put('/products/2')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 3,
        })
        .set('access_token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(403)
            expect(body).toHaveProperty("message", "You are not an admin!")
            done()
        })
    })
    it('TEST STOCK FILLED WITH MINUS NUMBER RESPONDS WITH JSON', function(done) {
        request(app)
        .put('/products/2')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: -1,
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body.errors[0]).toHaveProperty("message", "Do not input value under 1!")
            done()
        })
    })
    it('TEST PRICE FILLED WITH MINUS NUMBER RESPONDS WITH JSON', function(done) {
        request(app)
        .put('/products/2')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: -1,
            stock: 2,
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body.errors[0]).toHaveProperty("message", "Do not input value under 1!")
            done()
        })
    })
    it('TEST STOCK FILLED WITH STRING RESPONDS WITH JSON', function(done) {
        request(app)
        .put('/products/2')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 'dua',
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(400)
            expect(body.errors[0]).toHaveProperty("message", "Validation isNumeric on stock failed")
            done()
        })
    })


})


// DELETE
describe('test failed crud products', function() {
    it('TEST FAILED WITHOUT ACCESS TOKEN RESPONDS WITH JSON', function(done) {
        request(app)
        .delete('/products/2')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 1,
        })
        .then(response => {
            const { body, status } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Doesnt recognize user..")
            done()
        })

    })
    it('TEST ACCESS_TOKEN NOT ADMIN RESPONDS WITH JSON', function(done) {
        request(app)
        .delete('/products/2')
        .send({
            name: 'Lipstick Mac',
            image_url: "https://images.app.goo.gl/Vzwscn6RcdxTnjyn9",
            price: 350000,
            stock: 2,
        })
        .set('access_token', token)
        .then(response => {
            const { body, status } = response
            expect(status).toBe(403)
            expect(body).toHaveProperty("message", "You are not an admin!")
            done()
        })
    })
})
