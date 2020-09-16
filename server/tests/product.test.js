const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const { generateToken, decode } = require('../helpers/jwt')



const userData = {
    name: 'admin',
    email: 'admin@mail.com',
    password: '123456',
    role: 'admin'
}

const customer = {
    name: 'customer',
    email: 'customer@mail.com',
    password: 'qwerty',
    role: 'customer'
}

const productAdd = {
    name: 'Adidas',
    image_url: 'https://s3.ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2015/10/adidas.jpeg',
    price: 2500000,
    stock: 5,
    gender: 'male',
    CategoryId: 3
}

const productEdit = {
    name: 'Adidas Running',
    image_url: 'https://s3.ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2015/10/adidas.jpeg',
    price: 3000000,
    stock: 10,
    gender: 'male',
    CategoryId: 3
}

let access_token = ''
let token = ''
let productId = ''


beforeAll(done => {
    User.create(userData)
        .then(user => {
            const payload = { id: user.id, name: user.name, email: user.email, role: user.role }
            access_token = generateToken(payload)
            console.log(access_token)
            return User.create(customer)
        })
        .then(user => {
            const customer = { id: user.id, name: user.name, email: user.email, role: user.role }
            token = generateToken(customer)
            done()
        })
        .catch(err => {
            done()
        })

})


afterAll(done => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            return queryInterface.bulkDelete('Products')
        })
        .then(() => done())
        .catch(err => {
            done()
        })

})

// Test Success Case

describe(' test add Product POST /products/add ', () => {
    it('responds with json', function (done) {
        request(app)
            .post('/products/add')
            .send(productAdd)
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                productId = response.body.id
                console.log(productId)
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', productAdd.name)
                expect(body).toHaveProperty('image_url', productAdd.image_url)
                expect(body).toHaveProperty('price', productAdd.price)
                expect(body).toHaveProperty('stock', productAdd.stock)
                expect(body).toHaveProperty('gender', productAdd.gender)
                expect(body).toHaveProperty('CategoryId', productAdd.CategoryId)
                expect(body).toHaveProperty('createdAt', expect.anything())
                expect(body).toHaveProperty('updatedAt', expect.anything())
                done()

            })
    });
})



describe(' test show Product GET /products ', () => {
    it('responds with json', function (done) {
        request(app)
            .get('/products')
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                // console.log(body.products[0], '<<<< ini response')
                expect(status).toBe(200)
                expect(body.products[0]).toHaveProperty('id', expect.any(Number))
                expect(body.products[0]).toHaveProperty('name', productAdd.name)
                expect(body.products[0]).toHaveProperty('image_url', productAdd.image_url)
                expect(body.products[0]).toHaveProperty('price', productAdd.price)
                expect(body.products[0]).toHaveProperty('stock', productAdd.stock)
                expect(body.products[0]).toHaveProperty('gender', productAdd.gender)
                expect(body.products[0]).toHaveProperty('CategoryId', productAdd.CategoryId)
                expect(body.products[0]).toHaveProperty('createdAt', expect.anything())
                expect(body.products[0]).toHaveProperty('updatedAt', expect.anything())
                done()

            })
    });
})

describe(' test edit Product GET /products/edit/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .get(`/products/edit/${productId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                // console.log(body.product, '<<<< ini response')
                expect(status).toBe(200)
                expect(body.product).toHaveProperty('id', expect.any(Number))
                expect(body.product).toHaveProperty('name', productAdd.name)
                expect(body.product).toHaveProperty('image_url', productAdd.image_url)
                expect(body.product).toHaveProperty('price', productAdd.price)
                expect(body.product).toHaveProperty('stock', productAdd.stock)
                expect(body.product).toHaveProperty('gender', productAdd.gender)
                expect(body.product).toHaveProperty('CategoryId', productAdd.CategoryId)
                expect(body.product).toHaveProperty('createdAt', expect.anything())
                expect(body.product).toHaveProperty('updatedAt', expect.anything())
                done()

            })
    });
})

describe(' test edit Product PUT /products/edit/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .put(`/products/edit/${productId}`)
            .send(productEdit)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                // console.log(response.body, '<<<< ini response')
                expect(status).toBe(201)
                expect(body).toHaveProperty('message', `Successfully update Product with id ${productId}`)
                done()

            })
    });
})

describe(' test delete Product DELETE /products/delete/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .delete(`/products/delete/${productId}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(response => {
                const { status, body } = response
                // console.log(response.body, '<<<< ini response')
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', `Successfully delete Product with id ${productId}`)
                done()

            })
    });
})

// Test error case add product

describe(' test error add Product without access_token POST /products/add ', () => {
    it('responds with json', function (done) {
        request(app)
            .post('/products/add')
            .send(productAdd)
            // .set('access_token', access_token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(401)
                expect(text).toMatch( /"Invalid email or password"/)

                done()

            })
    });
})

describe(' test error add Product with unauthorize token POST /products/add ', () => {
    it('responds with json', function (done) {
        request(app)
            .post('/products/add')
            .send(productAdd)
            .set('access_token', token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(403)
                expect(text).toMatch( /"Forbidden Access"/)

                done()

            })
    });
})


describe(' test error add Product with empty required field  POST /products/add ', () => {
    it('responds with json', function (done) {
        request(app)
            .post('/products/add')
            .send({
                name: '',
                image_url: 'https://s3.ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2015/10/adidas.jpeg',
                price: 2500000,
                stock: 5,
                gender: 'male',
                CategoryId: 3
            })
            .set('access_token', access_token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(400)
                expect(text).toMatch( /"Name cannot empty"/)

                done()

            })
    });
})


describe(' test error add Product with minus(-) value on field stock & price  POST /products/add ', () => {
    it('responds with json', function (done) {
        request(app)
            .post('/products/add')
            .send({
                name: 'Adidas',
                image_url: 'https://s3.ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2015/10/adidas.jpeg',
                price: -1000,
                stock: -5,
                gender: 'male',
                CategoryId: 3
            })
            .set('access_token', access_token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(400)
                expect(text).toMatch( /"Price cannot less then 1"/)
                expect(text).toMatch( /"Stock cannot less then 1"/)
                done()

            })
    });
})


describe(' test error add Product with different type value  POST /products/add ', () => {
    it('responds with json', function (done) {
        request(app)
            .post('/products/add')
            .send({
                name: 'Adidas',
                image_url: 'https://s3.ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2015/10/adidas.jpeg',
                price: 'angka',
                stock: 5,
                gender: 'male',
                CategoryId: 3
            })
            .set('access_token', access_token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(400)
                expect(text).toMatch( /Invalid input value price/)
                done()

            })
    })
})

// test errors update product
describe(' test error edit Product without access_token PUT /products/edit/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .put(`/products/edit/${productId}`)
            .send(productEdit)
            // .set('access_token', access_token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(401)
                expect(text).toMatch( /"Invalid email or password"/)

                done()

            })
    });
})

describe(' test error edit Product with unauthorize token PUT /products/edit/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .put(`/products/edit/${productId}`)
            .send(productAdd)
            .set('access_token', token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(403)
                expect(text).toMatch( /"Forbidden Access"/)

                done()

            })
    });
})


describe(' test error edit Product with empty required field  PUT /products/edit/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .put(`/products/edit/${productId}`)
            .send({
                name: '',
                image_url: 'https://s3.ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2015/10/adidas.jpeg',
                price: 2500000,
                stock: 5,
                gender: 'male',
                CategoryId: 3
            })
            .set('access_token', access_token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(400)
                expect(text).toMatch( /"Name cannot empty"/)

                done()

            })
    });
})


describe(' test error edit Product with minus(-) value on field stock & price  PUT /products/edit/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .put(`/products/edit/${productId}`)
            .send({
                name: 'Adidas',
                image_url: 'https://s3.ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2015/10/adidas.jpeg',
                price: -1000,
                stock: -5,
                gender: 'male',
                CategoryId: 3
            })
            .set('access_token', access_token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(400)
                expect(text).toMatch( /"Price cannot less then 1"/)
                expect(text).toMatch( /"Stock cannot less then 1"/)
                done()

            })
    });
})


describe(' test error edit Product with different type value  PUT /products/edit/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .put(`/products/edit/${productId}`)
            .send({
                name: 'Adidas',
                image_url: 'https://s3.ap-southeast-1.amazonaws.com/swa.co.id/wp-content/uploads/2015/10/adidas.jpeg',
                price: 'angka',
                stock: 5,
                gender: 'male',
                CategoryId: 3
            })
            .set('access_token', access_token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(400)
                expect(text).toMatch( /Invalid input value price/)
                done()

            })
    });
})

describe(' test error delete Product without access_token DELETE /products/delete/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .put(`/products/delete/${productId}`)
            // .set('access_token', access_token)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(401)
                expect(text).toMatch( /"Invalid email or password"/)

                done()

            })
    });
})

describe(' test error delete Product with unauthorize token DELETE /products/delete/:id ', () => {
    it('responds with json', function (done) {
        request(app)
            .delete(`/products/delete/${productId}`)
            .set('access_token', token)
            .set('role', customer.name)
            .then(err => {
                const { status, text } = err
                console.log(text, '<<<< ini error')
                expect(status).toBe(403)
                expect(text).toMatch( /"Forbidden Access"/)

                done()

            })
    });
})
