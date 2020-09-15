const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const {Product} = require('../models')

const userData = {
    email: 'admin@mail.com',
    password: '1234',
    role: 1,
    access_token: ''
}

const testItem = {
    name: 'Smoke of Deceit',
    image_url: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/0/04/Smoke_of_Deceit_icon.png',
    price: 90,
    stock: 2,
    category: 1,
    id: 0
}

beforeAll(done => {
    request(app)
    .post('/login')
    .send({
        email: userData.email,
        password: userData.password
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(res => {
        userData.access_token = res.body.access_token
        done()
    })
})

afterAll(done => {
    queryInterface.bulkDelete('Products')
    .then(() => {
        queryInterface.bulkDelete('Users', {role: {[Sequelize.Op.not]: [1]}})
        .then(() => done())
        .catch(err => {
            done()
        })
    })
    .catch(err => {
        done()
    })
})

describe('Product test - Success', () => {
    test('POST /products (Add product)', done => {
        request(app)
        .post('/products')
        .send(testItem)
        .set('Accept', 'application/json')
        .set('access_token', userData.access_token)
        .expect('Content-Type', /json/)
        .then(res => {
            console.log(res.body, '<<<<<<<<<<<<<<<');
            const {body, status} = res
            expect(status).toBe(201)
            expect(body).toHaveProperty('product', expect.any(Object))
            expect(body.product).toHaveProperty('id', expect.any(Number))
            expect(body.product).toHaveProperty('name', testItem.name)
            expect(body.product).toHaveProperty('image_url', testItem.image_url)
            expect(body.product).toHaveProperty('price', testItem.price)
            expect(body.product).toHaveProperty('stock', testItem.stock)
            expect(body.product).toHaveProperty('category', expect.any(String))
            testItem.id = Number(body.product.id)
            done()
        })
    })

    test('GET /products (Get all products)', done => {
        request(app)
        .get('/products')
        .set('Accept', 'application/json')
        .set('access_token', userData.access_token)
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(200)
            expect(body).toHaveProperty('products', expect.any(Array))
            expect(body.products[0]).toHaveProperty('id', expect.any(Number))
            expect(body.products[0]).toHaveProperty('name', testItem.name)
            expect(body.products[0]).toHaveProperty('price', testItem.price)
            expect(body.products[0]).toHaveProperty('stock', testItem.stock)
            expect(body.products[0]).toHaveProperty('category', expect.any(Number))
            done()
        })
    })

    test('PUT /products/:id (Restock product)', done => {
        request(app)
        .put(`/products/${testItem.id}`)
        .send({
            stock: 10
        })
        .set('Accept', 'application/json')
        .set('access_token', userData.access_token)
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(200)
            expect(body).toHaveProperty('product', expect.any(Object))
            expect(body.product).toHaveProperty('id', expect.any(Number))
            expect(body.product).toHaveProperty('name', testItem.name)
            expect(body.product).toHaveProperty('stock', 12)
            done()
        })
    })

    test('PATCH /products/:id (Edit product)', done => {
        request(app)
        .patch(`/products/${testItem.id}`)
        .send({
            image_url: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7a/Smoke_Screen_icon.png',
            price: 100,
            category: 2
        })
        .set('Accept', 'application/json')
        .set('access_token', userData.access_token)
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(200)
            expect(body).toHaveProperty('product', expect.any(Object))
            expect(body.product).toHaveProperty('id', expect.any(Number))
            expect(body.product).toHaveProperty('name', testItem.name)
            expect(body.product).toHaveProperty('image_url', 'https://static.wikia.nocookie.net/dota2_gamepedia/images/7/7a/Smoke_Screen_icon.png')
            expect(body.product).toHaveProperty('price', 100)
            expect(body.product).toHaveProperty('category', 'Accessories')
            done()
        })
    })

    test('DELETE /products/:id (Delete product)', done => {
        request(app)
        .delete(`/products/${testItem.id}`)
        .set('Accept', 'application/json')
        .set('access_token', userData.access_token)
        .expect('Content-Type', /json/)
        .then(res => {
            const {body, status} = res
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'Product deleted successfully')
            done()
        })
    })
})

describe('Product test - Failed', () => {
    describe('Create Product', () => {
        test('No access token', done => {
            request(app)
            .post('/products')
            .send(testItem)
            .set('Accept', 'application/json')
            .set('access_token', '')
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(401)
                expect(body).toHaveProperty('errors', ['Access token not provided'])
                done()
            })
        })

        test('Access token not admin', done => {
            let access_token_dummy = ''
            request(app)
            .post('/register')
            .send({
                email: 'test@mail.com',
                password: '1234'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(res => {
                request(app)
                .post('/login')
                .send({
                    email: 'test@mail.com',
                    password: '1234'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {
                    access_token_dummy = res.body.access_token
                    request(app)
                    .post('/products')
                    .send(testItem)
                    .set('Accept', 'application/json')
                    .set('access_token', access_token_dummy)
                    .expect('Content-Type', /json/)
                    .then(res => {
                        const {body, status} = res
                        expect(status).toBe(403)
                        expect(body).toHaveProperty('errors', ['User not authorized'])
                        done()
                    })
                })
            })
        })

        test('Empty required fields', done => {
            request(app)
            .post('/products')
            .send({
                name: '',
                image_url: '',
                price: ''
            })
            .set('Accept', 'application/json')
            .set('access_token', userData.access_token)
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', ['Name cannot be empty', 'Invalid image url', 'Image url cannot be empty', 'Price must be a number', 'Price cannot be empty'])
                done()
            })
        })

        test('Negative price', done => {
            request(app)
            .post('/products')
            .send({
                name: testItem.name,
                image_url: testItem.image_url,
                price: -1
            })
            .set('Accept', 'application/json')
            .set('access_token', userData.access_token)
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', ['Price must be a positive number'])
                done()
            })
        })

        test('Negative stock', done => {
            request(app)
            .post('/products')
            .send({
                name: testItem.name,
                image_url: testItem.image_url,
                price: testItem.price,
                stock: -1
            })
            .set('Accept', 'application/json')
            .set('access_token', userData.access_token)
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', ['Stock must be a positive number'])
                done()
            })
        })

        test('Invalid data type entered', done => {
            request(app)
            .post('/products')
            .send({
                name: testItem.name,
                image_url: testItem.image_url,
                price: 'hehe',
                stock: 'hehe'
            })
            .set('Accept', 'application/json')
            .set('access_token', userData.access_token)
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', ['Price must be a number', 'Stock must be a number'])
                done()
            })
        })
    })

    describe('Restock Product', () => {
        test('Negative stock', done => {
            request(app)
            .put(`/products/${testItem.id}`)
            .send({
                stock: -1
            })
            .set('Accept', 'application/json')
            .set('access_token', userData.access_token)
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', ['Restock value must be positive'])
                done()
            })
        })
    })

    describe('Edit Product', () => {
        test('No access token', done => {
            request(app)
            .patch(`/products/${testItem.id}`)
            .send(testItem)
            .set('Accept', 'application/json')
            .set('access_token', '')
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(401)
                expect(body).toHaveProperty('errors', ['Access token not provided'])
                done()
            })
        })

        test('Access token not admin', done => {
            let access_token_dummy = ''
            request(app)
            .post('/register')
            .send({
                email: 'test@mail.com',
                password: '1234'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(res => {
                request(app)
                .post('/login')
                .send({
                    email: 'test@mail.com',
                    password: '1234'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {
                    access_token_dummy = res.body.access_token
                    request(app)
                    .patch(`/products/${testItem.id}`)
                    .send(testItem)
                    .set('Accept', 'application/json')
                    .set('access_token', access_token_dummy)
                    .expect('Content-Type', /json/)
                    .then(res => {
                        const {body, status} = res
                        expect(status).toBe(403)
                        expect(body).toHaveProperty('errors', ['User not authorized'])
                        done()
                    })
                })
            })
        })

        test('Negative price', done => {
            request(app)
            .patch(`/products/${testItem.id}`)
            .send({
                name: testItem.name,
                image_url: testItem.image_url,
                price: -1
            })
            .set('Accept', 'application/json')
            .set('access_token', userData.access_token)
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', ['Price must be a positive number'])
                done()
            })
        })

        test('Invalid data type entered', done => {
            request(app)
            .patch(`/products/${testItem.id}`)
            .send({
                name: testItem.name,
                image_url: testItem.image_url,
                price: 'hehe'
            })
            .set('Accept', 'application/json')
            .set('access_token', userData.access_token)
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(400)
                expect(body).toHaveProperty('errors', ['Price must be a number'])
                done()
            })
        })
    })

    describe('Delete Product', () => {
        test('No access token', done => {
            request(app)
            .delete(`/products/${testItem.id}`)
            .send(testItem)
            .set('Accept', 'application/json')
            .set('access_token', '')
            .expect('Content-Type', /json/)
            .then(res => {
                const {body, status} = res
                expect(status).toBe(401)
                expect(body).toHaveProperty('errors', ['Access token not provided'])
                done()
            })
        })

        test('Access token not admin', done => {
            let access_token_dummy = ''
            request(app)
            .post('/register')
            .send({
                email: 'test@mail.com',
                password: '1234'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(res => {
                request(app)
                .post('/login')
                .send({
                    email: 'test@mail.com',
                    password: '1234'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {
                    access_token_dummy = res.body.access_token
                    request(app)
                    .delete(`/products/${testItem.id}`)
                    .send(testItem)
                    .set('Accept', 'application/json')
                    .set('access_token', access_token_dummy)
                    .expect('Content-Type', /json/)
                    .then(res => {
                        const {body, status} = res
                        expect(status).toBe(403)
                        expect(body).toHaveProperty('errors', ['User not authorized'])
                        done()
                    })
                })
            })
        })
    })
})