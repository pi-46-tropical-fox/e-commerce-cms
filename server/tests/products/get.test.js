const request = require('supertest')
const app = require('../../app.js')
const { User } = require('../../models')
const { generateToken } = require('../../helpers/token')

let access_token;

beforeAll(async (done) => {
    try {
        // user admin
        const userData = await User.findOne({where : { email : 'bla@mail.com'}})

        const token = generateToken({id : userData.id, email : userData.email, role : userData.role})
        access_token = token
        
        done()
    } catch(err) {
        done()
    }
})

// Test Success /product Get
describe('test success /product Get', () => {
    test('test success, no failure, reponds with json', (done) => {
        request(app)
            .get('/product')
            .send({ name: 'M16A1', image_url: 'https://large.shootingsportsmedia.com/651533.jpg', price: 3000, stock: 5 })
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                expect(body.message).toBe('Product Fetched Successfully')
                expect(status).toBe(200)
                done()
            })
    })
})

describe('test fail /product Get', () => {
    test('test without token', (done) => {
        request(app)
            .get('/product')
            .send({ name: 'M16A1', image_url: 'https://large.shootingsportsmedia.com/651533.jpg', price: 3000, stock: 5 })
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
})