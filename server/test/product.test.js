const request = require('supertest')
const app = require('../app')
const {User, Product} = require('../models')
const {generateToken} = require('../helpers/jwt')

let access_token
let new_access_token
let id
beforeAll((done) => {
    if(process.env.NODE_ENV === 'test'){
            let user_data =   {
                firstName: 'Abdul',
                lastName: 'Fattah',
                email: 'abdul@mail.com',
                password: '123456',
                role: 'admin'
            }
            User.create(user_data)
        .then(user => {
            access_token = generateToken(user)
            let new_user_data =   {
                firstName: 'Abdul',
                lastName: 'Fattah',
                email: 'abdul2@mail.com',
                password: '123456',
                role: 'customer'
            }
            return User.create(new_user_data)                   
        })
        .then(user => {
            new_access_token = generateToken(user)
            return done()  
        })
        .catch(err => {
            return done(err)
        })
    }
})

afterAll((done) => {
    if(process.env.NODE_ENV === 'test'){
        User.destroy({truncate: true})
        .then(_ => {
            return Product.destroy({truncate: true})
        })
        .then(_ => {
            return done()
        })
        .catch(err => {
            return done(err)
        })
    }
})

let product_data = {
    name: 'Samsung Galaxy S20+',
    img_url: 'https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-8-hubble-x1-could-blue-gallery-mobile-img.jpg',
    color: 'Cloud Blue',
    capacity: '128GB',
    price: 14499000,
    stock: 10,
    CategoryId: 1
}
let updated_product_data = {
    name: 'Samsung Galaxy S20+',
    img_url: 'https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-8-hubble-x1-could-blue-gallery-mobile-img.jpg',
    color: 'Cloud Blue',
    capacity: '128GB',
    price: 13499000,
    stock: 9,
    CategoryId: 1
}

describe('Test POST /products', () => {
    //Success Case
    describe('Success create new product', () => {
        test('Should send object with keys: {product:{id, img_url, color, capacity, price, stock, CategoryId}, message} ', (done) => {
            request(app)
                .post('/products')
                .send(product_data)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty('product.id', expect.any(Number))
                        expect(res.body).toHaveProperty('product.name', product_data.name)
                        expect(res.body).toHaveProperty('product.img_url', product_data.img_url)
                        expect(res.body).toHaveProperty('product.color', product_data.color)
                        expect(res.body).toHaveProperty('product.capacity', product_data.capacity)
                        expect(res.body).toHaveProperty('product.price', product_data.price)
                        expect(res.body).toHaveProperty('product.stock', product_data.stock)
                        expect(res.body).toHaveProperty('product.CategoryId', product_data.CategoryId)
                        expect(res.body).toHaveProperty('message', 'New product has been added')
                        id = res.body.product.id
                        return done()
                    }
                })
        })
    })

    //Fail Case
    describe('Failed create new product', () => {
        test('Because of empty name field', (done) => {
            let emptyName = {...product_data, name: ''}
            request(app)
                .post('/products')
                .send(emptyName)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Name field cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of empty img field', (done) => {
            let emptyImg = {...product_data, img_url: ''}
            request(app)
                .post('/products')
                .send(emptyImg)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Image cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of empty color field', (done) => {
            let emptyColor = {...product_data, color: ''}
            request(app)
                .post('/products')
                .send(emptyColor)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Color field cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of empty capacity field', (done) => {
            let emptyCapacity = {...product_data, capacity: ''}
            request(app)
                .post('/products')
                .send(emptyCapacity)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Capacity field cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of invalid number format of price', (done) => {
            let invalidPrice = {...product_data, price: ''}
            request(app)
                .post('/products')
                .send(invalidPrice)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Invalid number format']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of less than 0 of price', (done) => {
            let invalidPrice = {...product_data, price: -1 }
            request(app)
                .post('/products')
                .send(invalidPrice)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Value must greater than 0']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of invalid number format of stock', (done) => {
            let invalidStock = {...product_data, stock: ''}
            request(app)
                .post('/products')
                .send(invalidStock)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Invalid number format']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of less than 0 of price', (done) => {
            let invalidStock = {...product_data, stock: -1 }
            request(app)
                .post('/products')
                .send(invalidStock)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Value must greater than 0']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of user not authenticated', (done) => {
            let invalid_access_token = ''
            request(app)
                .post('/products')
                .send(product_data)
                .set('access_token', invalid_access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['User not authenticated']
                        expect(res.status).toBe(401)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of user role is not admin', (done) => {
            request(app)
                .post('/products')
                .send(product_data)
                .set('access_token', new_access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Forbidden access']
                        expect(res.status).toBe(403)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
    })
})

describe('Test GET /products', () => {
    //Success Case
    describe('Success get all product', () => {
        test('Should send array of object with statusCode 200', (done) => {
            request(app)
                .get('/products')
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        expect(res.status).toBe(200)  
                        expect(res.body).not.toBeFalsy()
                        return done()
                    }
                })
        })
    })

    //Failed Case
    describe('Failed to get all product', () => {
        test('Because of user not authenticated', (done) => {
            let invalid_access_token = ''
            request(app)
                .get('/products')
                .set('access_token', invalid_access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['User not authenticated']
                        expect(res.status).toBe(401)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
    })
})

describe('Test PUT /products/:productId', () => {
    //Success Case
    describe('Success update product by productId', () => {
        test('Should send object with keys : message, and statusCode 200', (done) => {
            request(app)
                .put(`/products/${id}`)
                .set('access_token', access_token)
                .send(updated_product_data)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        expect(res.status).toBe(200)  
                        expect(res.body).toHaveProperty('message', 'Product has been updated')
                        expect(res.body).not.toBeFalsy()
                        return done()
                    }
                })
        })
    })

    //Failed Case
    describe('Failed to update product', () => {
        test('Because of empty name field', (done) => {
            let emptyName = {...updated_product_data, name: ''}
            request(app)
                .put(`/products/${id}`)
                .send(emptyName)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Name field cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of empty img field', (done) => {
            let emptyImg = {...updated_product_data, img_url: ''}
            request(app)
                .put(`/products/${id}`)
                .send(emptyImg)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Image cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of empty color field', (done) => {
            let emptyColor = {...updated_product_data, color: ''}
            request(app)
                .put(`/products/${id}`)
                .send(emptyColor)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Color field cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of empty capacity field', (done) => {
            let emptyCapacity = {...updated_product_data, capacity: ''}
            request(app)
                .put(`/products/${id}`)
                .send(emptyCapacity)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Capacity field cannot be empty']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of invalid number format of price', (done) => {
            let invalidPrice = {...updated_product_data, price: ''}
            request(app)
                .put(`/products/${id}`)
                .send(invalidPrice)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Invalid number format']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of less than 0 of price', (done) => {
            let invalidPrice = {...updated_product_data, price: -1 }
            request(app)
                .put(`/products/${id}`)
                .send(invalidPrice)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Value must greater than 0']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of invalid number format of stock', (done) => {
            let invalidStock = {...updated_product_data, stock: ''}
            request(app)
                .put(`/products/${id}`)
                .send(invalidStock)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Invalid number format']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of less than 0 of price', (done) => {
            let invalidStock = {...updated_product_data, stock: -1 }
            request(app)
                .put(`/products/${id}`)
                .send(invalidStock)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Value must greater than 0']
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of user not authenticated', (done) => {
            let invalid_access_token = ''
            request(app)
                .put(`/products/${id}`)
                .send(updated_product_data)
                .set('access_token', invalid_access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['User not authenticated']
                        expect(res.status).toBe(401)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of user role is not admin', (done) => {
            request(app)
                .put(`/products/${id}`)
                .send(updated_product_data)
                .set('access_token', new_access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Forbidden access']
                        expect(res.status).toBe(403)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
    })
})

describe('Test DELETE /products/:productId', () => {
    //Success Case
    describe('Success delete product by productId', () => {
        test('Should send object with keys : message, and statusCode 200', (done) => {
            request(app)
                .delete(`/products/${id}`)
                .set('access_token', access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        expect(res.status).toBe(200)  
                        expect(res.body).toHaveProperty('message', 'Product has been deleted')
                        expect(res.body).not.toBeFalsy()
                        return done()
                    }
                })
        })
    })

    //Failed Case
    describe('Failed to delete product', () => {
        test('Because of user not authenticated', (done) => {
            let invalid_access_token = ''
            request(app)
                .delete(`/products/${id}`)
                .set('access_token', invalid_access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['User not authenticated']
                        expect(res.status).toBe(401)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
        test('Because of user role is not admin', (done) => {
            request(app)
                .delete(`/products/${id}`)
                .set('access_token', new_access_token)
                .end((err, res) => {
                    if(err) return done(err)
                    else{
                        const errors = ['Forbidden access']
                        expect(res.status).toBe(403)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                        return done()
                    }
                })
        })
    })
})