const jwt = require('jsonwebtoken')
const request = require('supertest')
const app = require('../app')
const { User } = require('../models')

const userData = {email: 'admin1@gmail.com', password: '123456'}
let access_token = ''

beforeAll((done) => {
    //misal mau generate token sebelum test get product
    User.findOne({where:{email:userData.email}})
    .then(user => {
        // console.log(user, 'ini user di beforeAll')
        access_token = jwt.sign({email:user.email}, 'kampretochocolatos')
        done()
    })
    .catch(err =>{
        // console.log(err, 'error di beforeAll')
        done()
    } )

})

describe('test get Item  GET /products', function(){
    test('Test success get items responds with json', function(done){
        request(app) // http://localhost:3000
        .get('/products') //method type
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response get')
            const {body, status} = response
            expect(status).toBe(200)
            body.forEach(datum => {
                expect(datum).toHaveProperty('name', expect.any(String))
            })
            done()
        })
    })
})

describe('test post new item  POST /products/:productId', function(){
    test('Test success post item responds with json', function(done){
        request(app) // http://localhost:3000
        .post('/products') //method type
        .send({
            name: "Seiko SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 10,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post')
            const {body, status} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', expect.any(String))
            done()
        })
    })

    test('Test failed post item no access_token', function(done){
        request(app) // http://localhost:3000
        .post('/products') //method type
        .send({
            name: "Seiko SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 10,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post no access_token')
            const {body, status} = response
            expect(status).toBe(401)
            body.forEach(textErr => {
                expect(textErr).toBe('User authentication failed')
            })
            done()
        })
    })

    test('Test failed post item role is not admin', function(done){
        request(app) // http://localhost:3000
        .post('/products') //method type
        .send({
            name: "Seiko SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 10,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTYwMDE2NTM2NH0.IgXRmtk1BmMqZ_oy8aSawINhkObSDldoq7fpW5yy-Mw') //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response post fail not admin')
            const {body, status} = response
            expect(status).toBe(401)
            body.forEach(textErr => {
                expect(textErr).toBe("you don't have access for this feature")
            })
            done()
        })
    })

    test('Test failed post item with empty required field', function(done){
        request(app) // http://localhost:3000
        .post('/products') //method type
        .send({
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 10,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail null name')
            const {body, status} = response
            expect(status).toBe(400)
            body.forEach(textErr => {
                expect(textErr).toBe("Product.name cannot be null")
            })
            done()
        })
    })

    test('Test failed post item with fill required field with empty string', function(done){
        request(app) // http://localhost:3000
        .post('/products') //method type
        .send({
            name: "",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 10,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail null name')
            const {body, status} = response
            expect(status).toBe(400)
            body.forEach(textErr => {
                expect(textErr).toBe("Name cannot be empty")
            })
            done()
        })
    })

    test('Test failed post item with minus stock', function(done){
        request(app) // http://localhost:3000
        .post('/products') //method type
        .send({
            name: "SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: -10,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail stock minus')
            const {body, status} = response
            expect(status).toBe(400)
            body.forEach(textErr => {
                expect(textErr).toBe("Validation min on stock failed")
            })
            done()
        })
    })

    test('Test failed post item with minus price', function(done){
        request(app) // http://localhost:3000
        .post('/products') //method type
        .send({
            name: "SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 10,
            price: -3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail stock minus')
            const {body, status} = response
            expect(status).toBe(400)
            body.forEach(textErr => {
                expect(textErr).toBe("Validation min on price failed")
            })
            done()
        })
    })

    test('Test failed post item with wrong data type', function(done){
        request(app) // http://localhost:3000
        .post('/products') //method type
        .send({
            name: "SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: "i love you",
            price: -3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail wrong datatype')
            const {body, status} = response
            expect(status).toBe(400)
            body.forEach(textErr => {
                expect(textErr).toBe("Validation min on price failed")
            })
            done()
        })
    })
})

describe('test existing item  PUT /items', function(){
    test('Test success update item responds with json', function(done){
        request(app) // http://localhost:3000
        .put('/products/2') //method type
        .send({
            name: "Seiko SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic",
            description: "Pepsi version of SKX007",
            stock: 8,
            price: 3550000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response correct update')
            const {body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'update successful')
            done()
        })
    })

    test('Test failed update item no access_token', function(done){
        request(app) // http://localhost:3000
        .put('/products/21') //method type
        .send({
            name: "Seiko SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 10,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post no access_token')
            const {body, status} = response
            expect(status).toBe(401)
            body.forEach(textErr => {
                expect(textErr).toBe('User authentication failed')
            })
            done()
        })
    })

    test('Test failed update item role is not admin', function(done){
        request(app) // http://localhost:3000
        .put('/products/2') //method type
        .send({
            name: "Seiko SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 18,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTYwMDE2NTM2NH0.IgXRmtk1BmMqZ_oy8aSawINhkObSDldoq7fpW5yy-Mw') //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response update fail not admin')
            const {body, status} = response
            expect(status).toBe(401)
            body.forEach(textErr => {
                expect(textErr).toBe("you don't have access for this feature")
            })
            done()
        })
    })

    test('Test failed update item with empty required field', function(done){
        request(app) // http://localhost:3000
        .put('/products/2') //method type
        .send({
            name: "",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 10,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response update fail null name')
            const {body, status} = response
            expect(status).toBe(400)
            body.forEach(textErr => {
                expect(textErr).toBe("Name cannot be empty")
            })
            done()
        })
    })

    test('Test failed update item with minus stock', function(done){
        request(app) // http://localhost:3000
        .put('/products/2') //method type
        .send({
            name: "SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: -10,
            price: 3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail stock minus')
            const {body, status} = response
            expect(status).toBe(400)
            body.forEach(textErr => {
                expect(textErr).toBe("Validation min on stock failed")
            })
            done()
        })
    })

    test('Test failed update item with minus price', function(done){
        request(app) // http://localhost:3000
        .put('/products/2') //method type
        .send({
            name: "SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: 10,
            price: -3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail stock minus')
            const {body, status} = response
            expect(status).toBe(400)
            body.forEach(textErr => {
                expect(textErr).toBe("Validation min on price failed")
            })
            done()
        })
    })

    test('Test failed update item with wrong data type', function(done){
        request(app) // http://localhost:3000
        .put('/products/2') //method type
        .send({
            name: "SKX009",
            gender: "Men",
            category: "Diver",
            diameter: "43mm",
            movement: "Automatic 7S26",
            description: "Pepsi version of SKX007",
            stock: "i love you",
            price: -3500000,
            image: "https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066"
        })
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post fail wrong datatype')
            const {body, status} = response
            expect(status).toBe(400)
            body.forEach(textErr => {
                expect(textErr).toBe("Validation min on price failed")
            })
            done()
        })
    })
})

describe('delete existing item  DELETE /products/:productId', function(){
    test('Test success delete item', function(done){
        request(app) // http://localhost:3000
        .delete('/products/25') //method type
        .set('access_token', access_token) //headers
        .set('Accept', 'application/json') //headers 
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response success delete')
            const {body, status} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'delete item successful')
            done()
        })
    })

    test('Test failed delete item no access_token', function(done){
        request(app) // http://localhost:3000
        .delete('/products/17') //method type
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response.body, 'ini response delete no access_token')
            const {body, status} = response
            expect(status).toBe(401)
            body.forEach(textErr => {
                expect(textErr).toBe('User authentication failed')
            })
            done()
        })
    })


    test('Test failed delete item role not admin', function(done){
        request(app) // http://localhost:3000
        .delete('/products/17') //method type
        .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTYwMDE2NTM2NH0.IgXRmtk1BmMqZ_oy8aSawINhkObSDldoq7fpW5yy-Mw') //headers
        .set('Accept', 'application/json') //headers
        .expect('Content-Type', /json/)
        .then(response => {
            // console.log(response, 'ini response post')
            const {body, status} = response
            expect(status).toBe(401)
            body.forEach(textErr => {
                expect(textErr).toBe("you don't have access for this feature")
            })
            done()
        })
    })


})