const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
let productId;
let access_token;
let fake_token;
const users = { email: "admin@mail.com", role: "admin" }
const fakeAdmin = { email: "fakeadmin@mail.com", role: "customer" }
beforeAll((done) => {
  User
    .findOne({where: {email: users.email}})
    .then(user => {
      access_token = generateToken(user)
      done()
    })
    .catch(err => {
      done()
    })
  User
    .findOne({where: {email: fakeAdmin.email}})
    .then(user => {
      fake_token = generateToken(user)
      done()
    })
    .catch(err => {
      done()
    })
})
afterAll((done) => {
  queryInterface
    .bulkDelete('Products')
    .then(()=> done())
    .catch(err => {
      done()
    })
})
describe('test create product POST /products', () => {
  it('Test success create product responds with json', (done) => {
    request(app)
      .post('/products')
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: "https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg",
          price: 10000000,
          stock: 5
        }
      )
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        productId = body.id
        expect(status).toBe(201)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
    })
  })
})
describe('test get all product GET /products', () => {
  it('Test success get all product responds with json', (done) => {
    request(app)
      .get('/products')
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(response).toHaveProperty("body", expect.any(Array))
        done()
    })
  })
})
describe('test get product by id GET /products/:id', () => {
  it('Test success get product by id responds with json', (done) => {
    request(app)
      .get(`/products/${productId}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
    })
  })
})
describe('test update a product PUT /products/:id', () => {
  it('Test success update a product responds with json', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: "https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg",
          price: 10000000,
          stock: 5
        }
      )
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(response).toHaveProperty("body", expect.any(Object))
        done()
    })
  })
})
describe('test failed create product POST /products', () => {
  it('Test failed create without access_token responds with json', (done) => {
    request(app)
      .post('/products')
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: "https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg",
          price: 10000000,
          stock: 5
        }
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'user not authenticated')
        done()
    })
  })
  it('Test failed create with wrong access_token responds with json', (done) => {
    request(app)
      .post('/products')
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: "https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg",
          price: 10000000,
          stock: 5
        }
      )
      .set('access_token', fake_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(403)
        done()
    })
  })
  it('Test failed create empty in required field responds with json', (done) => {
    request(app)
      .post('/products')
      .send(
        {
          name: '', 
          image_url: '',
          price: 9000000,
          stock: 5
        }
      )
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        let error = JSON.parse(response.text)
        expect(status).toBe(400)
        expect(error.errors[0]).toHaveProperty('message', 'name required')
        done()
      })
  })
  it('Test failed input negative price responds with json', (done) => {
    request(app)
      .post('/products')
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: 'https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg',
          price: -90000,
          stock: 5
        }
      )
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        let error = JSON.parse(response.text)
        expect(status).toBe(400)
        expect(error.errors[0]).toHaveProperty('message', 'must be a non-negative number')
        done()
      })
  })
  it('Test failed input negative stock responds with json', (done) => {
    request(app)
      .post('/products')
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: 'https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg',
          price: 90000,
          stock: -5
        }
      )
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        let error = JSON.parse(response.text)
        expect(status).toBe(400)
        expect(error.errors[0]).toHaveProperty('message', 'must be a non-negative number')
        done()
      })
  })
  it('Test failed input with wrong data type responds with json', (done) => {
    request(app)
      .post('/products')
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: 'https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg',
          price: 'martugen',
          stock: 'letsmiwing'
        }
      )
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        let error = JSON.parse(response.text)
        expect(status).toBe(400)
        expect(error.errors[0]).toHaveProperty('message', 'must be a number')
        done()
      })
  })
})
describe('test failed update product PUT /products', () => {
  it('Test failed update without access_token responds with json', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: "https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg",
          price: 10000000,
          stock: 5
        }
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'user not authenticated')
        done()
    })
  })

  it('Test failed update with wrong access_token responds with json', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: "https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg",
          price: 10000000,
          stock: 5
        }
      )
      .set('access_token', fake_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(403)
        done()
    })
  })
  it('Test failed update with negative price responds with json', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: 'https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg',
          price: -90000,
          stock: 5
        }
      )
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        let error = JSON.parse(response.text)
        expect(status).toBe(400)
        expect(error.errors[0]).toHaveProperty('message', 'must be a non-negative number')
        done()
      })
  })
  it('Test failed update with negative stock responds with json', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: 'https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg',
          price: 90000,
          stock: -5
        }
      )
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        let error = JSON.parse(response.text)
        expect(status).toBe(400)
        expect(error.errors[0]).toHaveProperty('message', 'must be a non-negative number')
        done()
      })
  })
  it('Test failed update product with wrong data type responds with json', (done) => {
    request(app)
      .put(`/products/${productId}`)
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: 'https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg',
          price: 'martugen',
          stock: 'letsmiwing'
        }
      )
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        let error = JSON.parse(response.text)
        expect(status).toBe(400)
        expect(error.errors[0]).toHaveProperty('message', 'must be a number')
        done()
      })
  })
})
describe('test delete a product DELETE /products/:id', () => {
  it('Test failed delete a product without access_token responds with json', (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'user not authenticated')
        done()
    })
  })
  it('Test failed delete with fake access_token responds with json', (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .send(
        {
          name: 'Apple Iphone Xs Max', 
          image_url: "https://i.ebayimg.com/images/g/gR0AAOSwQdJfJCMr/s-l640.jpg",
          price: 10000000,
          stock: 5
        }
      )
      .set('access_token', fake_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('message', 'forbidden access')
        done()
    })
  })
  it('Test success delete a product responds with json', (done) => {
    request(app)
      .delete(`/products/${productId}`)
      .set('access_token', access_token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('message', 'successfully delete')
        done()
    })
  })
})