const request = require('supertest')
const app = require('../../app.js')
const { Product, User } = require('../../models')
const { generateToken } = require('../../helpers/token')

let createdId = 0
let access_token;
let access_token2;

beforeAll(async (done) => {
    try {
        const data = await Product.create({ name: 'M16A1', image_url: 'https://large.shootingsportsmedia.com/651533.jpg', price: 3000, stock: 5 })
        createdId = data.dataValues.id

        // user admin
        const userData = await User.findOne({where : { email : 'bla@mail.com'}})
        // user member
        const userData2 = await User.findOne({where : { email : 'kab@mail.com'}})

        const token = generateToken({id : userData.id, email : userData.email, role : userData.role})
        const token2 = generateToken({id : userData2.id, email : userData2.email, role : userData2.role})
        access_token = token
        access_token2 = token2

        done()
    } catch(err) {
        console.log(err)
        done()
    }
})

// Test Success Product Delete
describe('test success /product DELETE', () => {
    test('test success /product DELETE reponds with json', (done) => {
        request(app)
            .delete(`/product/${createdId}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { status } = response
                expect(status).toBe(200)
                done()
            })
    })
})

describe('test failed /product DELETE', () => {
    test('failed case, No Token Given, green mean its working', (done) => {
        request(app)
            .delete(`/product/${createdId}`)
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

    test('failed case, Wrong Token Given, green mean its working', (done) => {
        request(app)
            .delete(`/product/${createdId}`)
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