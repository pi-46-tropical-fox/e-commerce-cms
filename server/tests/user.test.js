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
    test ("success register", (done) => {
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

    test("register with invalid email form", (done) => {
        request (app)
        .post ("/login")
        .send ({email: "dummy_useremail.com", password: "dummy_user"})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .then (response => {
            const {body, status} = response
            expect (status).toBe (400)
            expect (body).toHaveProperty (Object.keys(response.body))
            done()
        })
    })

    test("register with blank password field", (done) => {
        request (app)
        .post ("/login")
        .send ({email: "dummy_user@email.com", password: ""})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .then (response => {
            const {body, status} = response
            expect (status).toBe (400)
            expect (body).toHaveProperty (Object.keys(response.body))
            done()
        })
    })
})


describe ("POST/login", () => {
    test ("success login", (done) => {
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


    test("login with invalid email", (done) => {
        request (app)
        .post ("/login")
        .send ({email: "not_dummy_user@email.com", password: "dummy_user"})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .then (response => {
            const {body, status} = response
            expect (status).toBe (400)
            expect (body).toHaveProperty (Object.keys(response.body))
            done()
        })
    })

    test("login with blank email field", (done) => {
        request (app)
        .post ("/login")
        .send ({email: "", password: "dummy_user"})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .then (response => {
            const {body, status} = response
            expect (status).toBe (400)
            expect (body).toHaveProperty (Object.keys(response.body))
            done()
        })
    })

    test("login with blank password field", (done) => {
        request (app)
        .post ("/login")
        .send ({email: "dummy_user@email.com", password: ""})
        .set ("Accept", "application/json")
        .expect ("Content-Type", /json/)
        .then (response => {
            const {body, status} = response
            expect (status).toBe (400)
            expect (body).toHaveProperty (Object.keys(response.body))
            done()
        })
    })
})