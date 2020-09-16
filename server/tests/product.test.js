const request = require('supertest');
const app = require('../app');
const {User} = require('../models');
const {signJwt} = require('../helpers/jwt');

const userData = {email:'admin@mail.com', password:'1234'}

// token
let access_token = ''

beforeAll(function(done) {
    User.findOne({
        where:{email:userData.email}
    })
    .then(user => {
        
        access_token = signJwt(user)
        done()
    })
    .catch(err => {
        done(err)
    })
})

let product = {
    name: 'baju makan',
    image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
    price : 50000,
    stock : 12
    }
    

describe('test GET /products', function(){
    test('Test success get items responds with json', function(done){
        request(app) 
        .get('/products') 
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response get')
            const {body, status} = response
            expect(status).toBe(200)
            body.forEach(datum => {
                expect(datum).toHaveProperty('name', expect.any(String))
            })
            done()
        })
    })

})

describe('test POST /products', function(){
 
    test('Test success post item responds with json', function(done){
        
        request(app) 
        .post('/products') 
        .send(product)
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post')
            const {body, status} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', expect.any(String))
            done()
        })
    }) 
    
})

describe('test PUT /products', function(){
 
    test('Test success update item responds with json', function(done){
        let productUpdate = {
            name: 'baju makan update',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 50000,
            stock : 12
            }
        request(app) 
        .put('/products/2') 
        .send(productUpdate)
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response correct update')
            const {body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'Succes update')
            done()
        })
    })
    
})

describe('test DELETE /products', function(){
 
    test('Test success delete item', function(done){
        request(app) 
        .delete('/products/4') 
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response success delete')
            const {body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'Succes delete')
            done()
        })
    })
    
})