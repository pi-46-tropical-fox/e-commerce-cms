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
const editedDummy = {
    name: 'Baju lusuh',
    image_url: 'https://www.gstatic.com/webp/gallery/1.sm.jpg',
    price: 15000,
    stock: 10
    }
let access_token = ''

// afterAll((done) => {
//     queryInterface.bulkDelete('Products')
//     .then(() => {
//         // queryInterface.bulkDelete('Users')
//         done()
//     })
//     .catch(err => {
//         done()
//     })
//   });
 
beforeAll((done) => {
    User.findOne({where: {email: userDummy.email}})
    .then(user => {
        access_token = jwt.sign({id:user.id, email: user.email},'momogi')
        done()
    })
    .catch(err => {
        done()
    })
});

describe('Products Create >> POST /products', function() {
    it('return array of find All object and status 200', function(done) {
    request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(productDummy)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            // console.log(body,'<<<<<<<<<<<<<<<<<<<');
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('image_url', expect.any(String))
            expect(body).toHaveProperty('price', expect.any(Number))
            expect(body).toHaveProperty('stock', expect.any(Number))
            done()
            })
    });    
});

describe.only('Get All Products >> GET /products', function() {
    it('return array of find All object and status 200', function(done) {
    request(app)
        .get('/products')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            expect(status).toBe(200)
            body.products.forEach(obj => {
                console.log('ini di body',obj);
                expect(obj).toHaveProperty('id', expect.any(Number))
                expect(obj).toHaveProperty('name', expect.any(String))
                expect(obj).toHaveProperty('image_url', expect.any(String))
                expect(obj).toHaveProperty('price', expect.any(Number))
                expect(obj).toHaveProperty('stock', expect.any(Number))
            });
            done()
            })
    });    
});


describe('Edit Product by Id >> PUT /products', function() {
    it('return edited value and status 200', function(done) {
    request(app)
        .put('/products/37')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .send(editedDummy)
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            console.log('berhasil edit', body[0], status);
            expect(status).toBe(200)
            expect(body[0]).toBe(1);
            done()
            })
    });    
});

describe('Delete Product by Id >> DELETE /products', function() {
    it('return deleted value and status 200', function(done) {
    request(app)
        .delete('/products/37')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .then(response => {
            const {body,status} = response
            console.log(body, 'ini body');
            expect(status).toBe(200)
            expect(body).toBe(1);
            done()
            })
    });    
});