const request = require ("supertest")
const {User} = require ("../models")
const app = require ("../app.js")
// const UserController = require("../controllers/UserController.js")
const {sequelize} = require ("../models/index.js")
const {queryInterface} = sequelize
const {generateToken} = require ("../helpers/jwt.js")

beforeAll ((done) => {
    User.create ({email: "dummy_user@email.com", password: "dummy_user"})

    .then (data => {
        const access_token = generateToken (data)
        done ()
        return access_token
    })

    .catch (err => {
        // console.log (err)
        done ()
    })
})

afterAll ((done) => {
    queryInterface.bulkDelete ("Products")

    .then (() => done ())

    .catch (err => {
        done ()
    })
    
})

describe ("POST/products", () => {
    test ("success show products responds with json", (done) => {
        request (app)
        .post ("/products")
        .set ("access_token", access_token = beforeAll.access_token)
        .send ({name: "Testdummy_product", image_url: "dummy_image", price:100000, stock: 10})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .then (response => {
            const {body, status} = response
            // console.log (response, ">>>>>>>>")
            expect(status).toBe (201)
            expect (body).toHaveProperty ("body", expect.any(Object))
            done ()
        })
    })
})


