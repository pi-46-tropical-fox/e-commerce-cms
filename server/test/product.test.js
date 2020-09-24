const request = require('supertest')
const app = require('../app')
const {User, Product} = require('../models')
const { generateToken } = require('../helpers/jwt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let productId
let access_token
let fake_token
const userData = {
    email: 'admin1@mail.com', 
    password: '123456', 
    role: 'admin'
}

const customerData = {
    email: 'user@mail.com',
    password: '1234',
    role: 'customer'
}


beforeAll((done) => {
    User.create(userData)
    .then(user => {
        access_token = generateToken(user)
        // console.log(access_token, '<<<<<<');
        done()
    })
    .catch(err => {
        done(err)
    })

    User.create(customerData)
    .then(user => {
        fake_token = generateToken(user)
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})


describe('Product end points', function() {

    // SUCCESS CRUD PRODUCT

    it('Success create product', (done) => {
        request(app)
        .post('/product')
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 36000000,
            stock: 5
        })
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            // console.log(res, '<<<<<');
            productId = body.id
            expect(status).toBe(201)
            expect(res).toHaveProperty('body', expect.any(Object))
            done()
        })
    })


    it('Success read all product', (done) => {
        request(app)
        .get('/product')
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            // console.log(res, '<<<<<');
            expect(status).toBe(200)
            expect(res).toHaveProperty('body', expect.any(Object))
            done()
        })
    })


    it('Success read product by id', (done) => {
        request(app)
        .get(`/product/${productId}`)
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            // console.log(res, '<<<<<');
            expect(status).toBe(200)
            expect(res).toHaveProperty('body', expect.any(Object))
            done()
        })
    })


    it('Success update product by id', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('access_token', access_token)
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 37000000,
            stock: 1
        })
        .then(res => {
            const {body, status} = res
            // console.log(res, '<<<<<');
            expect(status).toBe(200)
            expect(res).toHaveProperty('body', expect.any(Object))
            done()
        })
    })


    it('Success delete product by id', (done) => {
        request(app)
        .delete(`/product/${productId}`)
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            // console.log(res, '<<<<<');
            expect(status).toBe(200)
            done()
        })
    })


    // FAIL CRUD PRODUCT

    // FAIL CREATE PRODUCT

    it('Fail create product without access_token', (done) => {
        request(app)
        .post('/product')
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 36000000,
            stock: 5
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'User not authenticated')
            done()
        })
    })


    it('Fail create product with access_token but not admin', (done) => {
        request(app)
        .post('/product')
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 36000000,
            stock: 5
        })
        .set('access_token', fake_token)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(403)
            expect(body).toHaveProperty('message', 'Forbidden access')
            done()
        })
    })


    it('Fail create product because field is empty', (done) => {
        request(app)
        .post('/product')
        .send({
            name: '',
            image_url: '',
            price: 36000000,
            stock: 5
        })
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            let error = JSON.parse(res.text)
            expect(status).toBe(400)
            expect(error.errors[0]).toHaveProperty('message', 'Name  must be filled!')
            done()
        })
    })


    it('Fail create product because stock is negative number', (done) => {
        request(app)
        .post('/product')
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 36000000,
            stock: -1
        })
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            let error = JSON.parse(res.text)
            expect(status).toBe(400)
            expect(error.errors[0]).toHaveProperty('message', 'Stock must be a non-negative number!')
            done()
        })
    })


    it('Fail create product because price is negative number', (done) => {
        request(app)
        .post('/product')
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: -1,
            stock: 5
        })
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            let error = JSON.parse(res.text)
            expect(status).toBe(400)
            expect(error.errors[0]).toHaveProperty('message', 'Price must be a non-negative number!')
            done()
        })
    })


    it('Fail create product because data type is different', (done) => {
        request(app)
        .post('/product')
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 36000000,
            stock: 'string'
        })
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            let error = JSON.parse(res.text)
            expect(status).toBe(400)
            expect(error.errors[0]).toHaveProperty('message', 'Stock must be a number!')
            done()
        })
    })


    // UPDATE PRODUCT

    it('Fail update product without access_token', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 36000000,
            stock: 5
        })
        .then(res => {
            const {body, status} = res
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'User not authenticated')
            done()
        })
    })


    it('Fail update product with access_token but not admin', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 36000000,
            stock: 5
        })
        .set('access_token', fake_token)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(403)
            done()
        })
    })


    it('Fail update product because stock is negative number', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 36000000,
            stock: -1
        })
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            let error = JSON.parse(res.text)
            expect(status).toBe(400)
            expect(error.errors[0]).toHaveProperty('message', 'Stock must be a non-negative number!')
            done()
        })
    })


    it('Fail update product because price is negative number', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: -1,
            stock: 5
        })
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            let error = JSON.parse(res.text)
            expect(status).toBe(400)
            expect(error.errors[0]).toHaveProperty('message', 'Price must be a non-negative number!')
            done()
        })
    })


    it('Fail update product because data type is different', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .send({
            name: 'MacBook pro 2020',
            image_url: 'https://asset.kompas.com/crops/RgC3AaQwCSYsuZRpCO9OSyRrE6s=/40x44:784x541/750x500/data/photo/2019/11/14/5dcca5e5d5a59.png',
            price: 36000000,
            stock: 'string'
        })
        .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            let error = JSON.parse(res.text)
            expect(status).toBe(400)
            expect(error.errors[0]).toHaveProperty('message', 'Stock must be a number!')
            done()
        })
    })


    // DELETE PRODUCT
    it('Fail delete product without access_token', (done) => {
        request(app)
        .delete(`/product/${productId}`)
        // .set('access_token', access_token)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'User not authenticated')
            done()
        })
    })


    it('Fail delete product because not admin', (done) => {
        request(app)
        .delete(`/product/${productId}`)
        .set('access_token', fake_token)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(403)
            expect(body).toHaveProperty('message', 'Forbidden access')
            done()
        })
    })
})



  