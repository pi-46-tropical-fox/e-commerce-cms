const request = require('supertest')
const app = require('../app')

const { sequelize } = require('../models')
const { User, Product } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require ('../helpers/jwt')


let admin_token = ''
let customer_token = ''

beforeAll((done) => {
  User.create({
    name : 'admin123',
    email : 'admin123@mail.com',
    password : '$2a$10$0nTwT',
    role : 'admin'
   })
    .then(user => {
      admin_token = generateToken(user)
      done()
    })
    .catch(err => {
      return done(err)
    })

   User.create({
     name : 'customer123',
     email : 'customer123@mail.com',
     password : 'nKSmAviQxht',
     role : 'customer'
   })
    .then(user => {
      customer_token = generateToken(user)
      done()
    })
    .catch(err => {
      return done(err)
    })

    queryInterface.bulkInsert('Products', [
      {
        name: "NVIDIA RTX 3080",
        image_url: "https://assets.pikiran-rakyat.com/crop/66x0:1189x618/x/photo/2020/09/02/1102419101.jpg",
        price: 13000000,
        stock: 10,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: "Apple Macbook Pro 16'",
        image_url: "https://360view.hum3d.com/zoom/Apple/Apple_MacBook_Pro_16_inch_Silver_1000_0001.jpg",
        price: 38000000,
        stock: 20,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: "Logitech Pebble Mouse",
        image_url: "https://logitech/mouse.com",
        price: 10000,
        stock: 20,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: "Bose Mini Smart Speaker",
        image_url: "https://bose/mini-speaker.com",
        price: 100000,
        stock: 20,
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
})

afterAll((done) =>{
  queryInterface.bulkDelete('Users')
    .then(() => done())
    .catch(err => {
      return done(err)
    })

  // queryInterface.bulkDelete('Products')
  //   .then(() => done())
  //   .catch(err => {
  //     return done(err)
  //   })
})

// ====== Success Testing ====== //
describe('Product endpoints success ', function () {
  
  it('Get all products GET /products', (done) => {
    request(app)
      .get('/products')
      .set('access_token', admin_token)
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Post new products POST /products', (done) => {
    request(app)
      .post('/products')
      .set('access_token', admin_token)
      .send({
        name: 'Handphone',
        image_url: 'https://example.com',
        price: 1000000,
        stock: 1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it("Get one product GET /products/:product_id", function (done) {
    request(app)
      .get("/products/1")
      .set("access_token", admin_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      });
  });

  it('Update existing product PUT /products/:product_id', (done) => {
    request(app)
      .put('/products/1')
      .set('access_token', admin_token)
      .send({
        name: 'Watch',
        image_url: 'https://example.com',
        price: 2000000,
        stock: 1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  it('Delete existing product DELETE /products/:product_id', (done) => {
    request(app)
      .delete('/products/2')
      .set('access_token', admin_token)
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(String));
        done()
      })
      .catch(err => {
        return done(err)
      })
  })
})


// ====== Fail Testing ====== //
describe('Product endpoints fail ', function () {

  // Endpoint GET /products
  it ('Get product with customer access token GET /products', (done) => {
    request(app)
      .get('/products')
      .set('access_token', customer_token)
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
  })
  
  it ('Get product without admin access token GET /products', (done) => {
    request(app)
      .get('/products')
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
  })

  // // Endpoint POST /products
  it ('Post new products without admin access token POST /products', (done) => {
    request(app)
      .post('/products')
      .set('access_token', customer_token)
      .send({
        name: 'Handphone',
        image_url: 'https://example.com',
        price: 1000000,
        stock: 1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
  })
  it ('Post new products without any access token POST /products', (done) => {
      request(app)
        .post('/products')
        .send({
          name: 'Handphone',
          image_url: 'https://example.com',
          price: 1000000,
          stock: 1
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(response).toHaveProperty("body", expect.any(Object));
          done()
        })
        .catch(err => {
          return done(err)
        })
    })
  it ('Post new products without product title POST /products', (done) => {
    request(app)
      .post('/products')
      .set('access_token', admin_token)
      .send({
        name: '',
        image_url: 'https://example.com',
        price: 1000000,
        stock: 1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
    })

  it ('Post new products with negative price value POST /products', (done) => {
    request(app)
      .post('/products')
      .set('access_token', admin_token)
      .send({
        name: 'Watch',
        image_url: 'https://example.com',
        price: -1,
        stock: 1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
    })

  it ('Post new products with negative stock value POST /products', (done) => {
    request(app)
      .post('/products')
      .set('access_token', admin_token)
      .send({
        name: 'Watch',
        image_url: 'https://example.com',
        price: 10000,
        stock: -1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
    })

  it ('Post new products with price contains string value POST /products', (done) => {
    request(app)
      .post('/products')
      .set('access_token', admin_token)
      .send({
        name: 'Watch',
        image_url: 'https://example.com',
        price: 'asd',
        stock: -1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
    })

  it ('Post new products with price contains string value POST /products', (done) => {
    request(app)
      .post('/products')
      .set('access_token', admin_token)
      .send({
        name: 'Watch',
        image_url: 'https://example.com',
        price: 10000,
        stock: 'hi'
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
    })

  // Endpoint UPDATE /products
  it ('Update existing products without admin access token PUT /products/:product_id', (done) => {
    request(app)
      .put('/products/3')
      .set('access_token', customer_token)
      .send({
        name: 'Handphone',
        image_url: 'https://example.com',
        price: 1000000,
        stock: 1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
  })
  
  it ('Update existing product without any access token PUT /products/:product_id', (done) => {
      request(app)
        .put('/products/3')
        .send({
          name: 'Handphone',
          image_url: 'https://example.com',
          price: 1000000,
          stock: 1
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(response).toHaveProperty("body", expect.any(Object));
          done()
        })
        .catch(err => {
          return done(err)
        })
    })
  
  it ('Update existing product without product title PUT /products/:product_id', (done) => {
  request(app)
    .put('/products/3')
    .set('access_token', admin_token)
    .send({
      name: '',
      image_url: 'https://example.com',
      price: 1000000,
      stock: 1
    })
    .then(response => {
      const { body, status } = response;
      expect(status).toBe(400);
      expect(response).toHaveProperty("body", expect.any(Object));
      done()
    })
    .catch(err => {
      return done(err)
    })
  })

  it ('Update existing product with negative price value PUT /products/:product_id', (done) => {
    request(app)
      .put('/products/3')
      .set('access_token', admin_token)
      .send({
        name: 'Watch',
        image_url: 'https://example.com',
        price: -1,
        stock: 1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
    })

  it ('Update existing product with negative stock value PUT /products/:product_id', (done) => {
    request(app)
      .put('/products/3')
      .set('access_token', admin_token)
      .send({
        name: 'Watch',
        image_url: 'https://example.com',
        price: 10000,
        stock: -1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
    })

  it ('Update existing product with price contains string value PUT /products/:product_id', (done) => {
    request(app)
      .put('/products/3')
      .set('access_token', admin_token)
      .send({
        name: 'Watch',
        image_url: 'https://example.com',
        price: 'asd',
        stock: -1
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
    })

  it ('Update existing product with price contains string value PUT /products/:product_id', (done) => {
    request(app)
      .put('/products/3')
      .set('access_token', admin_token)
      .send({
        name: 'Watch',
        image_url: 'https://example.com',
        price: 10000,
        stock: 'hi'
      })
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
    })

  // Endpoint DELETE /products
  it ('Delete existing products without admin access token DELETE /products/:product_id', (done) => {
    request(app)
      .delete('/products/3')
      .set('access_token', customer_token)
      .then(response => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(response).toHaveProperty("body", expect.any(Object));
        done()
      })
      .catch(err => {
        return done(err)
      })
  })
  
  it ('Delete existing product without any access token DELETE /products/:product_id', (done) => {
      request(app)
        .delete('/products/3')
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(response).toHaveProperty("body", expect.any(Object));
          done()
        })
        .catch(err => {
          return done(err)
        })
    })
  


})