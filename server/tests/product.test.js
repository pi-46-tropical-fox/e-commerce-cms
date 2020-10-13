const request = require ("supertest")
const {User} = require ("../models")
const app = require ("../app.js")
// const UserController = require("../controllers/UserController.js")
const {sequelize} = require ("../models/index.js")
const {queryInterface} = sequelize
const {generateToken} = require ("../helpers/jwt.js")
// const {Product} = require("../models/product")

let access_token = "12345"
let productId 

beforeAll ((done) => {
    User.create ({email: "dummy_admin@email.com", password: "dummy_admin", role: "admin"})
    

    .then (data => {
        let payload = {id: data.id, email: data.email, role: data.role}
        access_token = generateToken (payload)
        done ()    
    })

    .catch (err => {
        // console.log (err, "<<<<<<< ini err dari beforeAll")
        done (err)
    })
})

afterAll ((done) => {
    queryInterface.bulkDelete ("Users")
    // queryInterface.bulkDelete ("Products")

    .then (() => done ())

    .catch (err => {
        done ()
    })
    
})

describe ("POST/products", () => {
    test ("success register products", (done) => {
        // console.log (access_token)
        request (app)
        .post ("/products")
        .set ("access_token", access_token)
        .send ({name: "test_dummy_product", image_url: "dummy_image", price:100000, stock: 10})
        .set ("Accept", "application/json")
        // .expect ("Content-Type", /json/)
        .end ((err, response) => {
            const {body, status} = response
            productId = response.body.id
            // console.log (productId, "<<<<<<<< ini dari register")
            // console.log (err, "<<<<<<<<")
            expect(status).toBe (201)
            // expect(response.body).toMatchObject(Object)
            expect(response.body).toHaveProperty("id")
            expect(response.body).toHaveProperty("name", "test_dummy_product")
            done ()
        })
    })

    test ("failed to register products with blank name field", (done) => {
        request (app)
        .post ("/products")
        .set ("access_token", access_token)
        .send ({name: null ,image_url: "dummy_image", price:100000, stock: 10})
        .set ("Accept", "application/json")
        .then (response => {
            const {body, status} = response
            productId = response.body.id
            expect (status).toBe (400)
            done ()
        })
    })

    test ("failed to register products with null price field", (done) => {
        request (app)
        .post ("/products")
        .set ("access_token", access_token)
        .send ({name: "test_dummy_product" ,image_url: "dummy_image", price: null, stock: 10})
        .set ("Accept", "application/json")
        .then (response => {
            const {body, status} = response
            productId = response.body.id
            expect (status).toBe (400)
            done ()
        })
    })

    test ("failed to register products with price less than one", (done) => {
        request (app)
        .post ("/products")
        .set ("access_token", access_token)
        .send ({name: "test_dummy_product" ,image_url: "dummy_image", price: 0, stock: 10})
        .set ("Accept", "application/json")
        .then (response => {
            const {body, status} = response
            productId = response.body.id
            expect (status).toBe (400)
            done ()
        })
    })
})

describe ("GET/products", () => {
    test ("success show products", (done) => {
        request (app)
        .get ("/products")
        .set ("access_token", access_token)
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .then (response => {
            const {body, status} = response
            expect (status).toBe (200)
            // console.log ("ini dari get product")
            // expect (body).toHaveProperty (Object.keys(response.body))
            done ()
        })
        
    })
})

describe ("PUT/products/:id", () => {
    test ("success edit products", (done) => {
        request (app)
        .put (`/products/${productId}`)
        .set ("access_token", access_token)
        .send ({name: "test_dummy_product_1", image_url: "dummy_image_1", price:100000, stock: 10})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .end ((err, response) => {
            const {body, status} = response
            // console.log (response.body, "ini body")
            console.log (err, ">>>>>>>>")
            expect(status).toBe (200)
            expect (body).toHaveProperty (Object.keys(response.body))
            done ()
        })
    })

    test ("failed to find id product to edit", (done) => {
        request (app)
        .put (`/products/`)
        .set ("access_token", access_token)
        .send ({name: "test_dummy_product_1", image_url: "dummy_image_1", price:100000, stock: 10})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .end ((err, response) => {
            const {body, status} = response
            // console.log (response.body, "ini body")
            // console.log (err, ">>>>>>>>")
            expect(status).toBe (404)
            done ()
        })

    })
})

describe ("DELETE/products/:id", () => {
    test ("success delete products", (done) => {
        request (app)
        .delete (`/products/${productId}`)
        .set ("access_token", access_token)
        .then (response => {
            const {body, status} = response
            expect (status).toBe (200)
            done ()
        })
    })

    test ("failed to find id products to delete", (done) => {
        request (app)
        .delete (`/products/`)
        .set ("access_token", access_token)
        .then (response => {
            const {body, status} = response
            expect (status).toBe (404)
            done ()
        })
    })
})


