const request = require('supertest');
const app = require('../app');
const {sequelize,User} = require('../models')
const {queryInterface} = sequelize
const jwt = require('jsonwebtoken')

const userDummy = {email: 'john@mail.com', password: '123456'}
const productDummy = {
    name: 'Baju bekas',
    image_url: 'https://www.gstatic.com/webp/gallery/1.sm.jpg',
    price: 12000,
    stock: 9
    }
let access_token = ''

afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(() => done())
    .catch(err => {
        done()
    })
  });

beforeAll((done) => {
    User.create(userDummy)
    .then(user => {
        access_token = jwt.sign({id:user.id, email: user.email},'momogi')
        // console.log(access_token,'ini access token <<<<<<<<<<<<<<<<<<<<<<<,,');
        done()
    })
    .catch(err => {
        done()
    })
});

describe('Products Create POST /products', function() {
    it('post and return array of find All object and status 200', function(done) {
    request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(productDummy)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
           
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('image_url', expect.any(String))
            expect(body).toHaveProperty('price', expect.any(String))
            expect(body).toHaveProperty('stock', expect.any(Number))
            done()
            })
        .catch(err => {
            done()
        })
        });
        
});

describe.only('Get All Products GET /products', function() {
    it('success get products, return array of find All object and status 200', function(done) {
    request(app)
        .get('/products')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('email', productDummy.email)
            expect(body).toHaveProperty('message', 'Has been successfully registered')
            done()
            })
        .catch(err => {
            done()
        })
        });
        
});

