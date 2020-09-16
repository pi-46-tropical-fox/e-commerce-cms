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
                console.log(datum)
                expect(datum).toHaveProperty('name', expect.any(String))
            })
            done()
        })
    })

})

describe('test POST /products', function(){
 
    // test('Test success post item responds with json', function(done){
        
    //     request(app) 
    //     .post('/products') 
    //     .send(product)
    //     .set('access_token', access_token) 
    //     .set('Accept', 'application/json') 
    //     .expect('Content-Type', /json/)
    //     .then(response => {
    //         // console.log(response, 'ini response post')
    //         const {body, status} = response
    //         expect(status).toBe(201)
    //         expect(body).toHaveProperty('name', expect.any(String))
    //         done()
    //     })
    // })
    
    test('Test failed post item no access_token', function(done){
        request(app) 
        .post('/products') 
        .send({
                name: 'baju makan',
                image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
                price : 50000,
                stock : 12
            })
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response post no access_token')
            const {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })

    test('Test failed post item role is not admin', function(done){
        request(app) 
        .post('/products') 
        .send({
            name: 'baju makan',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 50000,
            stock : 12
        })
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTYwMDE2NTM2NH0.IgXRmtk1BmMqZ_oy8aSawINhkObSDldoq7fpW5yy-Mw')
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response post fail not admin')
            const {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })

    
    test('Test failed post item with empty required field', function(done){
        request(app) 
        .post('/products') 
        .send({
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 50000,
            
        })
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response post fail null name')
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })

    test('Test failed post item with fill required field with empty string', function(done){
        request(app) 
        .post('/products') 
        .send({
            name: '',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 50000,
            stock : 12
        })
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            console.log(response.body, 'ini response post fail null name')
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })
    test('Test failed post item with minus stock', function(done){
        request(app) 
        .post('/products') 
        .send({
            name: 'baju makan',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 50000,
            stock : -12
        })
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail stock minus')
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })

    test('Test failed post item with minus price', function(done){
        request(app) 
        .post('/products') 
        .send({
            name: 'baju makan',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : -50000,
            stock : 12
        })
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail price minus')
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })

    test('Test failed post item with wrong data type', function(done){
        request(app) 
        .post('/products') 
        .send({
            name: 'baju makan',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 'price',
            stock : 12
        })
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail wrong data type')
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })
    
})

describe('test PUT /products', function(){
 
    // test('Test success update item responds with json', function(done){
    //     let productUpdate = {
    //         name: 'baju makan update',
    //         image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
    //         price : 50000,
    //         stock : 12
    //         }
    //     request(app) 
    //     .put('/products/2') 
    //     .send(productUpdate)
    //     .set('access_token', access_token) 
    //     .set('Accept', 'application/json') 
    //     .expect('Content-Type', /json/)
    //     .then(response => {
    //         // console.log(response, 'ini response correct update')
    //         const {body, status} = response
    //         expect(status).toBe(200)
    //         expect(body).toHaveProperty('message', 'Succes update')
    //         done()
    //     })
    // })

    test('Test failed update item no access_token', function(done){
        request(app) 
        .put('/products/2') 
        .send({
                name: 'baju makan',
                image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
                price : 50000,
                stock : 12
            })
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response post no access_token')
            const {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })

    test('Test failed post item role is not admin', function(done){
        request(app) 
        .put('/products/3') 
        .send({
            name: 'baju makan',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 50000,
            stock : 12
        })
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTYwMDE2NTM2NH0.IgXRmtk1BmMqZ_oy8aSawINhkObSDldoq7fpW5yy-Mw')
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response post fail not admin')
            const {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })

    test('Test failed update item empty', function(done){
        request(app) 
        .put('/products/3') 
        .send({
            name: '',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 50000,
            stock : 12
        })
        .set('access_token', access_token)
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response empty')
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors', expect.any(Array))
            
            body.errors.forEach(datum=> {
                expect(datum).toBe('Name cannot be empty')
            })
            done()
        })
    })
    test('Test failed update item with minus stock', function(done){
        request(app) 
        .put('/products/3') 
        .send({
            name: 'baju makan',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 50000,
            stock : -12
        })
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail stock minus')
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors', expect.any(Array))
            body.errors.forEach(datum=> {
                expect(datum).toBe('Stock tidak boleh minus')
            })
            done()
        })
    })

    test('Test failed update item with minus price', function(done){
        request(app) 
        .put('/products/3') 
        .send({
            name: 'baju makan',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : -50000,
            stock : 12
        })
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail price minus')
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors', expect.any(Array))
            body.errors.forEach(datum=> {
                expect(datum).toBe('Price tidak boleh minus')
            })
            done()
        })
    })

    test('Test failed update item with wrong data type', function(done){
        request(app) 
        .put('/products/3') 
        .send({
            name: 'baju makan',
            image_url : 'https://www.tororo.com/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/m/o/mon_cheri_baju_koko_celana_grey_1.jpg',
            price : 'price',
            stock : 12
        })
        .set('access_token', access_token) 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail wrong data type')
            const {body, status} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('errors', expect.any(Array))
            body.errors.forEach(datum=> {
                expect(datum).toBe('Price harus number')
            })
            done()
        })
    })

    
})

describe('test DELETE /products', function(){
 
    // test('Test success delete item', function(done){
    //     request(app) 
    //     .delete('/products/4') 
    //     .set('access_token', access_token) 
    //     .set('Accept', 'application/json') 
    //     .expect('Content-Type', /json/)
    //     .then(response => {
    //         // console.log(response, 'ini response success delete')
    //         const {body, status} = response
    //         expect(status).toBe(200)
    //         expect(body).toHaveProperty('message', 'Succes delete')
    //         done()
    //     })
    // })

    test('Test failed delete item no access_token', function(done){
        request(app) 
        .delete('/products/7') 
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response delete no access_token')
            const {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })

    test('Test failed delete item role not admin', function(done){
        request(app) 
        .delete('/products/7') 
        .set('access_token', 'yJh1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTYwMDE2NTM2NH0.IgXRmtk1BmMqZ_oy8aSawINhkObSDldoq7fpW5yy-Mw') //headers
        .set('Accept', 'application/json') 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response delete')
            const {body, status} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('errors', expect.any(Array))
            done()
        })
    })
    
})