let request;
if(process.env.NODE_ENV === 'development'){ request = require('supertest')}
const app = require("../app")
const { Product } = require("../models")
const { format } = require('../helpers/currencyFormatter')
const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjUsImlhdCI6MTYwMDE2NjUwOX0.dp-RnTm7AAy5uZp-A41K-ZPRjlAQeecuZ8ngLtiu7kQ'

describe('CREATE', () => {
    describe('CREATE //SUCCESS', () => {
        it('expects that respond messages would include message, id, product name', async(done) => {
            const dummyProduct = {
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: 20000000,
                stock: 5,
                category: 'Electronics'
            }
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(201)
                    expect(res.body).toHaveProperty('message', 'Product has been successfully added')
                    expect(res.body).toHaveProperty('name', dummyProduct.name)
                    expect(res.body).toHaveProperty('stock', dummyProduct.stock)
                    expect(res.body).toHaveProperty('price', format(dummyProduct.price))
                    done()
                })
        })
    })
    describe('CREATE //FAIL', () => {
        it('responds when user doesnt provide access_token', async(done) => {
            const dummyProduct = {
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: 20000000,
                stock: 5,
                category: 'Electronics'
            }
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('errors', ['User is not authenticated'])
                    done()
                })
        })
        it('responds when user provides invalid access_token', async(done) => {
            const dummyProduct = {
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: 20000000,
                stock: 5,
                category: 'Electronics'
            }
            const access_token = 'salah bos'
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('errors', ['User is not authenticated'])
                    done()
                })
        })
        it('responds when user doesnt provide required field (name)', async(done) => {
            const dummyProduct = {
                name: '',
                imageURL: `https://www.google.com/imgres?`,
                price: null,
                stock: 5,
                category: 'Electronics'
            }
            const expectedErrors = ['Name must be filled']
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors))
                    done()
                })
        })
        it('responds when user doesnt provide required field (price)', async(done) => {
            const dummyProduct = {
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: null,
                stock: 5,
                category: 'Electronics'
            }
            const expectedErrors = ['Price must be filled']
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors))
                    done()
                })
        })
        it('responds when user doesnt provide required field (stock)', async(done) => {
            const dummyProduct = {
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: 20000000,
                stock: null,
                category: 'Electronics'
            }
            const expectedErrors = ['Stock must be filled']
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors))
                    done()
                })
        })
        it('responds when price is not greater than 0', async(done) => {
            const dummyProduct = {
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: 0,
                stock: 5,
                category: 'Electronics'
            }
            const expectedErrors = ["Price must be greater than 0"]
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors))
                    done()
                })
        })
        it('responds when stock is less than 0', async(done) => {
            const dummyProduct = {
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: 20000000,
                stock: -5,
                category: 'Electronics'
            }
            const expectedErrors = ["Stock must be equal or greater than 0"]
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors))
                    done()
                })
        })
        it('responds when types of data being input is invalid (price)', async(done) => {
            const dummyProduct = {
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: "20000000",
                stock: 5,
                category: 'Electronics'
            }
            const expectedErrors = ["Price must be a valid integer"]
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors))
                    done()
                })
        })
        it('responds when types of data being input is invalid (stock)', async(done) => {
            const dummyProduct = {
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: 20000000,
                stock: "5",
                category: 'Electronics'
            }
            const expectedErrors = ["Stock must be a valid integer"]
            const result = await request(app)
                .post('/product')
                .send(dummyProduct)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors))
                    done()
                })
        })
    })

})

describe('READ', () => {
    beforeEach((done) => {
        Product.create({
                name: 'Macbook PRO',
                imageURL: `https://www.google.com/imgres?`,
                price: 20000000,
                stock: 5,
                category: 'Electronics'
            })
            .then(data => {
                console.log('Success adding temporary data')
                done()
            }).catch(err => {
                console.log(err)
                done()
            })
    })
    afterEach((done) => {
        Product.destroy({ truncate: true })
            .then(data => {
                done()
            })
            .catch(err => {
                done()
            })
    })
    describe('READ //SUCCESS', () => {
        it('expects that respond messages will show an array of objects containing products information', async(done) => {
            const result = await request(app)
                .get('/product')
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty("data", expect.any(Array))
                    expect(res.body.data[0]).toHaveProperty('name', expect.any(String))
                    done()
                })
        })
    })
    describe('READ //FAIL', () => {
        it('responds when user doesnt prove access token', async(done) => {
            const result = await request(app)
                .get('/product')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('errors', ['User is not authenticated'])
                    done()
                })
        })
        it('responds when user provides invalid access_token', async(done) => {
            const access_token = 'salah bos'
            const result = await request(app)
                .get('/product')
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('errors', ['User is not authenticated'])
                    done()
                })
        })
    })
})


describe('UPDATE', () => {
    describe('UPDATE //SUCCESS', () => {
        it('expects that respond messages would include message, product nam and any updated fields', async(done) => {
            const updatedFields = {
                name: 'Macbook PRO',
                price: 20000000,
                stock: 5,
                category: 'Electronics'
            }
            const id = 1;
            const result = await request(app)
                .patch(`/product/${id}`)
                .send(updatedFields)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('message', 'Product has been successfully updated')
                    expect(res.body).toEqual(expect.objectContaining(updatedFields))
                    done()
                })
        })
    })
    describe('UPDATE //FAIL', () => {
        it('responds when user doesnt provide access_token', async(done) => {
            const updatedFields = {
                name: 'Macbook PRO',
                price: 20000000,
                category: 'Electronics'
            }
            const id = 1;
            const result = await request(app)
                .patch(`/product/${id}`)
                .send(updatedFields)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('errors', ['User is not authenticated'])
                    done()
                })
        })
        it('responds when user provides invalid access_token', async(done) => {
            const updatedFields = {
                name: 'Macbook PRO',
                price: 20000000,
                category: 'Electronics'
            }
            const access_token = 'salah bos'
            const id = 1;
            const result = await request(app)
                .patch(`/product/${id}`)
                .send(updatedFields)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('errors', ['User is not authenticated'])
                    done()
                })
        })
        it('responds when price is not greater than 0', async(done) => {
            const updatedFields = {
                name: 'Macbook PRO',
                price: 0,
                category: 'Electronics'
            }
            const id = 1;
            const expectedErrors = ["Price must be greater than 0"]
            const result = await request(app)
                .patch(`/product/${id}`)
                .send(updatedFields)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors))
                    done()
                })
        })
        it('responds when stock is less than 0', async(done) => {
            const updatedFields = {
                name: 'Macbook PRO',
                stock: -2,
                category: 'Electronics'
            }
            const id = 1;
            const expectedErrors = ["Stock must be equal or greater than 0"]
            const result = await request(app)
                .patch(`/product/${id}`)
                .send(updatedFields)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(400)
                    expect(res.body.errors).toEqual(expect.arrayContaining(expectedErrors))
                    done()
                })
        })
    })
})

describe('DELETE', () => {
    describe('DELETE //SUCCESS', () => {
        it('expects that respond messages would include message', async(done) => {
            const id = 2;
            const result = await request(app)
                .delete(`/product/${id}`)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('message', 'Product has been successfully deleted')
                    done()
                })
        })
    })
    describe('DELETE //FAIL', () => {
        it('responds when user doesnt provide access_token', async(done) => {
            const id = 3;
            const result = await request(app)
                .delete(`/product/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('errors', ['User is not authenticated'])
                    done()
                })
        })
        it('responds when user provides invalid access_token', async(done) => {
            const access_token = 'salah bos'
            const id = 3;
            const result = await request(app)
                .delete(`/product/${id}`)
                .set('Accept', 'application/json')
                .set('access_token', access_token)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('errors', ['User is not authenticated'])
                    done()
                })
        })
    })
})