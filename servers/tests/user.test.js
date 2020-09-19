if (process.env.NODE_ENV === "development") {
    const request = require("supertest");
}
const app = require(`../app`)
const {User, Product} = require(`../models`)
const {encode} = require(`../helpers/jwt`)
const {sequelize} = require(`../models`)
const {queryInterface} = sequelize

let access_token = ''
let customer_access_token = ''
let productExmp = {}

beforeAll( async done => {
    const user1 = {
        email: 'admin1@mail.com',
        password: '1234',
        role: 'admin'
    }

    const user2 = {
        email: 'customer1@mail.com',
        password: '1234'
    }

    const product1 = {
        name: 'customer1@mail.com',
        image_url: '1234',
        price: 5000,
        stock: 30
    }

    try{
        const user = await User.create(user1)
        const customer_user = await User.create(user2)
        
        const email1 = user.email
        const id1 = user.id
        const email2 = customer_user.email 
        const id2 = customer_user.id
        access_token = encode(email1, id1, user.role)
        customer_access_token = encode(email2, id2, customer_user.role)


        const product = await Product.create(product1)
        productExmp = product
        done()
    } catch(err) {
        done(err)
    }
})

afterAll( async (done) => {
    try{
        await queryInterface.bulkDelete('Users', {})
        await queryInterface.bulkDelete('Products', {})
        done()
    } catch (err) {
        done(err)
    }
})

describe('POST /login', () => {
    // Test IF login success
    test(`Successfully login`, (done) => {
        request(app)
          .post('/login')
          .send({email: 'admin1@mail.com', password: '1234'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(200)
              expect(body.data).toHaveProperty("email", "admin1@mail.com")
              expect(body).toHaveProperty("message", "Successfully login")
              done()
          })
          .catch((err) => {
            //   console.log(err)
              done(err)
          })
    })

    //HANDLING IF TEST FAIL
    //Errors Message
    const invalidEmailorPassword = ["Invalid Email or Password"]

    //Failed test cases
    const test_user1 = {
        email: 'admin1@mail.com',
        password: '12345'
    }

    //Test case if email is not existing in DB
    const test_user2 = {
        email: 'admin@mail.com',
        password: '1234'
    }

    //Test failure if email and password empty
    const test_user3 = {
        email: '',
        password: ''
    }

    // Test failure if email is valid but password is invalid
    test(`Valid email, Invalid password`, done => {
        request(app)
          .post('/login')
          .send(test_user1)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(403)
              expect(body).toHaveProperty("errors", invalidEmailorPassword)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    // Test failure if email is not exist in DB
    test(`Valid email, Invalid password`, done => {
        request(app)
          .post('/login')
          .send(test_user2)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(403)
              expect(body).toHaveProperty("errors", invalidEmailorPassword)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    // Test failure if email and password empty
    test(`Valid email, Invalid password`, done => {
        request(app)
          .post('/login')
          .send(test_user3)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(403)
              expect(body).toHaveProperty("errors", invalidEmailorPassword)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })
})

describe('POST /products', () => {
    //Input Data
    const input = {
        name: 'Kimetsu no yaiba', 
        image_url: 'https://fsb.zobj.net/crop.php?r=VTsTwAWPh7a57DvdJ4xHg42aE0q1Gx4rDZyYnHAnbRFgHo1af9cqDfVfbW4zb5GACOOJTmuXeShmpmQyZTdyqC2qhZKLH7_I39DBFfybj0sP1udO57NRr4DpAZwIGBXstHn_JdeWhqk7DBIr', 
        price: 20000, 
        stock: 20
    }

    //If any empty required field
    const input2 = {
        name: '', 
        image_url: input.image_url, 
        price: input.price, 
        stock: input.stock
    }

    //If stock value is minus
    const input3 = {
        name: input.name, 
        image_url: input.image_url, 
        price: input.price, 
        stock: -1
    }

    //If price value is minus
    const input4 = {
        name: input.name, 
        image_url: input.image_url, 
        price: -1, 
        stock: input.stock
    }

    //Wrong data type
    const input5 = {
        name: input.name, 
        image_url: input.image_url, 
        price: "string", 
        stock: "string"
    }

    //Test if add products success
    test('Successfully add new product', done => {
        request(app)
          .post('/products')
          .send(input)
          .set('access_token', access_token)
          .then(response => {
            const {body, status} = response
            expect(status).toBe(201)
            expect(body.data).toHaveProperty("name", "Kimetsu no yaiba")
            expect(body.data).toHaveProperty("image_url", "https://fsb.zobj.net/crop.php?r=VTsTwAWPh7a57DvdJ4xHg42aE0q1Gx4rDZyYnHAnbRFgHo1af9cqDfVfbW4zb5GACOOJTmuXeShmpmQyZTdyqC2qhZKLH7_I39DBFfybj0sP1udO57NRr4DpAZwIGBXstHn_JdeWhqk7DBIr")
            expect(body.data).toHaveProperty("price", 20000)
            expect(body.data).toHaveProperty("stock", 20)
            expect(body).toHaveProperty("message", "Successfully create new product")
            done()
          })
          .catch((err) => {
            console.log(`HERE IN CATCH`)
              console.log(err)
              done(err)
          })
    })
    
    //Test if add product failed
    //Erros message
    const userNotAuth = ["User is not authenticated"]
    const forbiddenAccess = ["Forbidden Access, only admin can manage the product"]
    const productNotFound = ["Product not found"]
    const emptyRequiredField = [
        "Name minimum is three and maximun fifty",
        "Name can not be empty"
    ]
    const stockIsMinus = ["Stock must be minimum 0"]
    const priceIsMinus = ["Price must be minimum 2000"]
    const wrongDataType = [
        "Price must only contain number",
        "Stock must only contain number"
    ]

    test('Not Insert Access Token', done => {
        request(app)
          .post('/products')
          .send(input)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(401)
              expect(body).toHaveProperty("errors", userNotAuth)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Access Token not belongs to admin', done => {
        request(app)
          .post('/products')
          .send(input)
          .set("access_token", customer_access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(403)
              expect(body).toHaveProperty("errors", forbiddenAccess)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Empty required field', done => {
        request(app)
          .post('/products')
          .send(input2)
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(400)
              expect(body).toHaveProperty("errors", emptyRequiredField)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Stock is minus', done => {
        request(app)
          .post('/products')
          .send(input3)
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(400)
              expect(body).toHaveProperty("errors", stockIsMinus)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Price is minus', done => {
        request(app)
          .post('/products')
          .send(input4)
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(400)
              expect(body).toHaveProperty("errors", priceIsMinus)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Wrong Data Type', done => {
        request(app)
          .post('/products')
          .send(input5)
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(400)
              expect(body).toHaveProperty("errors", wrongDataType)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })
})

describe(`GET /products`, () => {
    test('Get All Products', done => {
        request(app)
          .get('/products')
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(200)
              expect(body).toHaveProperty("data", expect.any(Object))
              done()
            })
            .catch((err) => {
              console.log(err)
              done(err)
          })
    })
})

describe(`PUT /products/:id`, () => {
    test('Success fully Get All Products', done => {
        request(app)
          .put(`/products/${productExmp.id}`)
          .send({
              name: "One piece",
              image_url: "https://i.pinimg.com/originals/e6/ba/0a/e6ba0a0e1a76e2fad592076f37bc50a3.jpg",
              price: 7000,
              stock: 1
          })
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(200)
              expect(body).toHaveProperty("message", "Successfully update product")
              done()
            })
            .catch((err) => {
              console.log(err)
              done(err)
          })
    })


    // FAILED TES
    //Erros message
    const userNotAuth = ["User is not authenticated"]
    const forbiddenAccess = ["Forbidden Access, only admin can manage the product"]
    const productNotFound = ["Product not found"]
    const emptyRequiredField = [
        "Name minimum is three and maximun fifty",
        "Name can not be empty"
    ]
    const stockIsMinus = ["Stock must be minimum 0"]
    const priceIsMinus = ["Price must be minimum 2000"]
    const wrongDataType = [
        "Price must only contain number",
        "Stock must only contain number"
    ]

    test('Not Insert Access Token', done => {
        request(app)
          .put(`/products/${productExmp.id}`)
          .send({
            name: "One piece",
            image_url: "https://i.pinimg.com/originals/e6/ba/0a/e6ba0a0e1a76e2fad592076f37bc50a3.jpg",
            price: 7000,
            stock: 1
          })
          .then(response => {
              const {body, status} = response
              expect(status).toBe(401)
              expect(body).toHaveProperty("errors", userNotAuth)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Access Token not belongs to admin', done => {
        request(app)
          .put(`/products/${productExmp.id}`)
          .send({
            name: "One piece",
            image_url: "https://i.pinimg.com/originals/e6/ba/0a/e6ba0a0e1a76e2fad592076f37bc50a3.jpg",
            price: 7000,
            stock: 1
          })
          .set("access_token", customer_access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(403)
              expect(body).toHaveProperty("errors", forbiddenAccess)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Stock is minus', done => {
        request(app)
        .put(`/products/${productExmp.id}`)
          .send({
            name: "One piece",
            image_url: "https://i.pinimg.com/originals/e6/ba/0a/e6ba0a0e1a76e2fad592076f37bc50a3.jpg",
            price: 7000,
            stock: -1
        })
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(400)
              expect(body).toHaveProperty("errors", stockIsMinus)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Price is minus', done => {
        request(app)
          .put(`/products/${productExmp.id}`)
          .send({
            name: "One piece",
            image_url: "https://i.pinimg.com/originals/e6/ba/0a/e6ba0a0e1a76e2fad592076f37bc50a3.jpg",
            price: -1,
            stock: 1
        })
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(400)
              expect(body).toHaveProperty("errors", priceIsMinus)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Wrong Data Type', done => {
        request(app)
          .put(`/products/${productExmp.id}`)
          .send({
            name: "One piece",
            image_url: "https://i.pinimg.com/originals/e6/ba/0a/e6ba0a0e1a76e2fad592076f37bc50a3.jpg",
            price: "String",
            stock: "STRING"
        })
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(400)
              expect(body).toHaveProperty("errors", wrongDataType)
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })
})

describe('DELETE /products/:id', () => {
    test('Successfully delete product', done => {
        request(app)
          .delete(`/products/${productExmp.id}`)
          .set("access_token", access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(200)
              expect(body).toHaveProperty("message", "Successfully delete product")
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Not include access_token', done => {
        request(app)
          .delete(`/products/${productExmp.id}`)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(401)
              expect(body).toHaveProperty("errors", [
                "User is not authenticated"
              ])
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })

    test('Access_token not belongs to admin', done => {
        request(app)
          .delete(`/products/${productExmp.id}`)
          .set("access_token", customer_access_token)
          .then(response => {
              const {body, status} = response
              expect(status).toBe(403)
              expect(body).toHaveProperty("errors", ["Forbidden Access, only admin can manage the product"])
              done()
          })
          .catch((err) => {
              console.log(err)
              done(err)
          })
    })
})