const request = require('supertest');
const app = require('../server');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {Admin,Product} = require('../models')
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let admin = {
  email: 'adiet@gmail.com',
  password: process.env.ADMIN_PASSWORD
}

let token = {
  valid: jwt.sign({
    UserId: admin.id,
    UserEmail: admin.email
  }, process.env.TOKEN_KEY)
}

let products = [
  {
    name: 'name',
    image_url: 'image',
    price: 100,
    stock: 100,
    category: 'category',
    description: 'description'
  },
  {
    name: '',
    image_url: '',
    price: 100,
    stock: 100,
    category: 'category',
    description: 'description'
  },
  {
    name: 'sony',
    image_url: 'sony',
    price: -10,
    stock: 100,
    category: 'category',
    description: 'description'
  }
];
let product

beforeAll(done => {
  Admin.create(admin)
    .then(user => {
      userToken = jwt.sign({
        UserId: admin.id,
        UserEmail: admin.email
      }, process.env.TOKEN_KEY)
      return Product.create({
        name: 'name',
        image_url: 'image',
        price: 100,
        stock: 100,
        category: 'category',
        description: 'description',
        Adminid : user.id
      })
    })
    .then(prod=>{
      product = prod
      done()
    })
    .catch(err => {
      done(err)
    })
})


afterAll(done => {
  queryInterface
  .bulkDelete('Products', {})
  .then(() => done())
  .catch(err => done(err))
});

describe('Product routes', () => {
  // console.log('iniproduct', product)
  describe('Get /admin/products', () => {
    it('Valid request', (done) => {
      return request(app)
        .get('/admin/products')
        .then(response => {
          let { status, body } = response
          expect(status).toBe(200)
          done()
        })
    })
  })

  describe('Post /products', () => {
    it('Valid token', (done) => {
      return request(app)
        .post('/admin/products')
        .set('access_token', token.valid)
        .send(products[0])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(201)
          done()
        })
    })

    it('Empty value', (done) => {
      return request(app)
        .post('/admin/products')
        .set('access_token', token.valid)
        .send(products[1])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(400)
          done()
        })
    })

    it('Must be greater than 0', (done) => {
      return request(app)
        .post('/admin/products')
        .set('access_token', token.valid)
        .send(products[2])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(400)
          done()
        })
    })

    it('Invalid token', (done) => {
      return request(app)
        .post('/admin/products')
        .set('access_token', 'notvalidtoken')
        .send(products[0])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(401)
          done()
        })
    })

    it('Token not found', (done) => {
      return request(app)
        .post('/admin/products')
        .send(products[0])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(404)
          done()
        })
    })
  })

  describe('Put /products/:id', () => {
    it('Success edit', (done) => {
      return request(app)
        .put(`/admin/products/${product.id}`)
        .set('access_token', token.valid)
        .send(products[0])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(200)
          done()
        })
    })

    it('Not Empty value', (done) => {
      return request(app)
        .put(`/admin/products/${product.id}`)
        .set('access_token', token.valid)
        .send(products[1])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(400)
          done()
        })
    })

    it('Must be greater than 0', (done) => {
      return request(app)
        .put(`/admin/products/${product.id}`)
        .set('access_token', token.valid)
        .send(products[2])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(400)
          done()
        })
    })

    it('Product not found', (done) => {
      return request(app)
        .put('/admin/products/1000')
        .set('access_token', token.valid)
        .send(products[0])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(404)
          done()
        })
    })

    it('Invalid token', (done) => {
      return request(app)
        .put(`/admin/products/${product.id}`)
        .set('access_token', 'notvalidtoken')
        .send(products[0])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(401)
          done()
        })
    })

    it('Token not found', (done) => {
      return request(app)
        .put('/admin/products/1')
        .send(products[0])
        .then(response => {
          let { status, body } = response
          expect(status).toBe(404)
          done()
        })
    })
  })

  describe('Delete /products/:id', () => {

    it('Product not found', (done) => {
      return request(app)
        .delete('/admin/products/1000')
        .set('access_token', token.valid)
        .then(response => {
          let { status, body } = response
          expect(status).toBe(404)
          done()
        })
    })

    it('Invalid token', (done) => {
      return request(app)
        .delete(`/admin/products/${product.id}`)
        .set('access_token', 'notvalidtoken')
        .then(response => {
          let { status, body } = response
          expect(status).toBe(401)
          done()
        })
    })

    it('Token not found', (done) => {
      return request(app)
        .delete(`/admin/products/${product.id}`)
        .then(response => {
          let { status, body } = response
          expect(status).toBe(404)
          done()
        })
    })

    it('Success delete', (done) => {
      return request(app)
        .delete(`/admin/products/${product.id}`)
        .set('access_token', token.valid)
        .then(response => {
          let { status, body } = response
          expect(status).toBe(200)
          done()
        })
    })
  })
})