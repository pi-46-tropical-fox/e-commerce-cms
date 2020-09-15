const request = require ("supertest")
const app = require ("../app.js")
const {sequelize} = require ("../models/index.js")
const {queryInterface} = sequelize

afterAll ((done) => {
    queryInterface.bulkDelete ("Users")

    .then (() => done ())

    .catch (err => {
        done ()
    })
    
})

describe ("POST/register", () => {
    test ("responds with json", (done) => {
        request (app)
        .post ("/register")
        .send ({email: "dummy_user@email.com", password:"dummy_user"})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .then (response => {
            const {body, status} = response
            // console.log (response, ">>>>>>>>")
            expect(status).toBe (201)
            expect (body).toHaveProperty ("email", "dummy_user@email.com")
            expect (body).toHaveProperty ("message", "Data has been saved")
            done ()
        })
    })
})


describe ("POST/login", () => {
    test ("responds with json", (done) => {
        request (app)
        .post ("/login")
        .send ({email: "dummy_user@email.com", password: "dummy_user"})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .then (response => {
            const {body, status} = response
            // console.log (response, ">>>>>>>>TesT<<<<<<<<<")
            expect (status).toBe (200)
            expect (body).toHaveProperty ("access_token", expect.any(String))
            done()
        })

    })
})