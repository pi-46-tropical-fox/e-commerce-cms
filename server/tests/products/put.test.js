const request = require('supertest')
const app = require('../../app.js')
const { sequelize, Product, User } = require('../../models')
const { queryInterface } = sequelize
const { generateToken } = require('../../helpers/token')

let createdId = 0
let access_token;
let access_token2;

beforeAll(async (done) => {
    try {
        const data = await Product.create({ name: 'M16A1', image_url: 'https://large.shootingsportsmedia.com/651533.jpg', price: 3000, stock: 5 })
        createdId = data.dataValues.id

        // user admin
        const userData = await User.findOne({ where: { email: 'bla@mail.com' } })
        // user member
        const userData2 = await User.findOne({ where: { email: 'kab@mail.com' } })

        const token = generateToken({ id: userData.id, email: userData.email, role: userData.role })
        const token2 = generateToken({ id: userData2.id, email: userData2.email, role: userData2.role })
        access_token = token
        access_token2 = token2
        done()
    } catch (err) {
        console.log(err)
        done()
    }
})

// bulkDelete After Test
afterAll(async (done) => {
    try {
        await queryInterface.bulkDelete('Products')
        done()
    } catch (err) {
        console.log(err)
        done()
    }
})

// Test Success Product PUT
describe('test /product PUT', () => {
    test('test success /product PUT reponds with json', (done) => {
        request(app)
            .put(`/product/${createdId}`)
            .send({ name: 'M16A4', image_url: 'https://large.shootingsportsmedia.com/651533.jpg', price: 7000, stock: 6 })
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body.message).toBe('Data Successfully Edited')
                done()
            })
    }),

        // Test /product put Failed User Input Doesn't meet required
        test('failed case, number filled with string, green mean its working', (done) => {
            request(app)
                .put(`/product/${createdId}`)
                .send({ name: 'M16A1', image_url: 'https://large.shootingsportsmedia.com/6515createdId.jpg', price: 'ini angka', stock: 'ini angka' })
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(400)
                    expect(body.errors[0]).toBe('Validation isInt on price failed')
                    expect(body.errors[1]).toBe('Validation isInt on stock failed')
                    done()
                })
        })

    test('failed case, input filled with undefined, green mean its working', (done) => {
        request(app)
            .put(`/product/${createdId}`)
            .send({ name: undefined, image_url: undefined, price: undefined, stock: undefined })
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body.errors[0]).toBe('Data Cant be Undefined')
                done()
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
    })

    test('failed case, input filled with null, green mean its working', (done) => {
        request(app)
            .put(`/product/${createdId}`)
            .send({ name: null, image_url: null, price: null, stock: null })
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body.errors[0]).toBe('Product.name cannot be null')
                expect(body.errors[1]).toBe('Product.image_url cannot be null')
                expect(body.errors[2]).toBe('Product.price cannot be null')
                expect(body.errors[3]).toBe('Product.stock cannot be null')
                done()
            })
    })

    test('failed case, input filled with empty, green mean its working', (done) => {
        request(app)
            .put(`/product/${createdId}`)
            .send({ name: '', image_url: '', price: '', stock: '' })
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body.errors[0]).toBe('Validation notEmpty on name failed')
                expect(body.errors[1]).toBe('Validation notEmpty on image_url failed')
                expect(body.errors[2]).toBe('Validation isInt on price failed')
                expect(body.errors[3]).toBe('Validation notEmpty on price failed')
                expect(body.errors[4]).toBe('Validation isInt on stock failed')
                expect(body.errors[5]).toBe('Validation notEmpty on stock failed')
                done()
            })
    })

    test('failed case, input filled with negative numbers, green mean its working', (done) => {
        request(app)
            .put(`/product/${createdId}`)
            .send({ name: 'M16A1', image_url: 'https://large.shootingsportsmedia.com/651533.jpg', price: -21, stock: -21 })
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body.errors[0]).toBe('Validation min on price failed')
                expect(body.errors[1]).toBe('Validation min on stock failed')
                done()
            })
    })

    test('failed case, No Token Given, green mean its working', (done) => {
        request(app)
            .put(`/product/${createdId}`)
            .send({ name: 'M16A1', image_url: 'https://large.shootingsportsmedia.com/651533.jpg', price: 21, stock: 21 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                body.errors.forEach(err => {
                    expect(err).toBe('User Not Authenticated')
                })
                done()
            })
    })

    test('failed case, wrong token given, green mean its working', (done) => {
        request(app)
            .put(`/product/${createdId}`)
            .send({ name: 'M16A1', image_url: 'https://large.shootingsportsmedia.com/651533.jpg', price: 21, stock: 21 })
            .set('Accept', 'application/json')
            .set('access_token', access_token2)
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(403)
                body.errors.forEach(err => {
                    expect(err).toBe('Forbidden')
                })
                done()
            })
    })
})