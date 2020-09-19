const request = require("supertest");
// const { sequelize } = require('../models')
// const { User, Product } = require('../models')
// const { encode } = require('../helpers/jwt')
// const { queryInterface } = sequelize
const app = require("../app.js");

describe("test user login POST/login", function () {
  it("test success login with json", function (done) {
    request(app)
      .post("/login")
      .send({ email: "vikvik@mail.com", password: "vikvik", role: "admin" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("email", "vikvik@mail.com");
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      });
  });
});

describe("Test Failed user login POST/login", () => {
  describe(`Test failed email not registered with json`, function () {
    it("400: invalid email or password", function (done) {
      request(app)
        .post("/login")
        .send({ email: "vik@mail.com", password: "vikvik", role: "admin" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty(Object.keys(response.body))
          done();
        });
    });
  });
  describe(`Test failed invalid password with json`, function(){
      it("400: invalid email or password", function (done){
          request(app)
          .post("/login")
          .send({ email: "vikvik@mail.com", password: "salah", role: "admin" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty(Object.keys(response.body))
            done();
          });
      })
  })
  describe(`Test failed empty value in login with json`, function(){
      it("400: bad request", function (done){
          request(app)
          .post("/login")
          .send({ email: "", password: "", role: "" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty(Object.keys(response.body))
            done();
          });
      })
  })
});


