const request = require("supertest");
const app = require("../app");

//Success Test

describe("test user login with POST /login", function () {
  it("test success login responds with json", function (done) {
    request(app)
      .post("/login")
      .send({ email: "admin@mail.com", password: "123456" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        done();
      });
  });
});

// Fail Test

describe("test user login with POST /login", function () {
  it("test fail login invalid password responds with json", function (done) {
    request(app)
      .post("/login")
      .send({ email: "admin@mail.com", password: "12345" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Invalid Username or Password");
        done();
      });
  });
  it("test fail login invalid email responds with json", function (done) {
    request(app)
      .post("/login")
      .send({ email: "admin2@mail.com", password: "123456" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Invalid Username or Password");
        done();
      });
  });
  it("test fail empty email and password responds with json", function (done) {
    request(app)
      .post("/login")
    //   .send({ email: "admin2@mail.com", password: "123456" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Invalid Username or Password");
        done();
      });
  });
});
