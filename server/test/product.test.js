const request = require('supertest')
const app = require('../app')
const {User, Product} = require('../models')
const { generateToken } = require('../helpers/jwt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token
const userData = {
    email: 'admin1@mail.com', 
    password: '123456', 
    role: 'admin'
}


beforeAll((done) => {
    User.create(userData)
    .then(user => {
        access_token = generateToken(user)
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
})
  