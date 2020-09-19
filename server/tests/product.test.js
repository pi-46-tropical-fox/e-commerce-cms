const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { User, Product } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const userData = { email: "admin1@mail.com", password: "admin", role: "Admin" };
const notAdmin = {
  email: "notadmin@mail.com",
  password: "bukanadmin",
  role: "Customer",
};
let access_token;
let token;

beforeAll((done) => {
  User.create(userData)
    .then((user) => {
      access_token = generateToken(user);
      done();
    })
    .catch((err) => {
      done();
    });
  User.create(notAdmin)
    .then((user) => {
      token = generateToken(user);
      done();
    })
    .catch((err) => {
      done();
    });
});

afterAll((done) => {
  // hapus isi database ketika test sudah selesai
  queryInterface
    .bulkDelete("Products")
    .then(() => done())
    .catch((err) => {
      done();
    });

  queryInterface
    .bulkDelete("Users")
    .then(() => done())
    .catch((err) => {
      done();
    });
});

//SUCCESS CRUD PRODUCTS

describe("test success crud products", function () {
  it("TEST SUCCESS POST PRODUCTS RESPONDS WITH JSON", function (done) {
    request(app)
      .post("/products")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: 1,
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      });
  });
  it("TEST SUCCESS GET PRODUCTS RESPONDS WITH JSON", function (done) {
    request(app)
      .get("/products")
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      });
  });
  it("TEST SUCCESS PUT PRODUCTS RESPONDS WITH JSON", function (done) {
    request(app)
      .put("/products/2")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: 2,
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(response).toHaveProperty("body", expect.any(Object));
        done();
      });
  });
  it("TEST SUCCESS DELETE PRODUCTS RESPONDS WITH JSON", function (done) {
    request(app)
      .delete("/products/2")
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        done();
      });
  });
});

//FAILED CRUD
//CREATE
describe("test failed crud products", function () {
  it("TEST FAILED WITHOUT ACCESS TOKEN RESPONDS WITH JSON", function (done) {
    request(app)
      .post("/products")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: 1,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST FAILED EMPTY FIELD RESPONDS WITH JSON", function (done) {
    request(app)
      .post("/products")
      .send({
        name: "",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 100000,
        stock: 2,
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST STOCK FILLED WITH MINUS NUMBER RESPONDS WITH JSON", function (done) {
    request(app)
      .post("/products")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 100000,
        stock: -1,
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST PRICE FILLED WITH MINUS NUMBER RESPONDS WITH JSON", function (done) {
    request(app)
      .post("/products")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: -1,
        stock: 2,
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST STOCK FILLED WITH STRING RESPONDS WITH JSON", function (done) {
    request(app)
      .post("/products")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: "angka",
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST ACCESS_TOKEN NOT ADMIN RESPONDS WITH JSON", function (done) {
    request(app)
      .post("/products")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: 3,
      })
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
});

//UPDATE

describe("test failed crud products", function () {
  it("TEST FAILED WITHOUT ACCESS TOKEN RESPONDS WITH JSON", function (done) {
    request(app)
      .put("/products/2")
      .send({
        name: "Bakso",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: 4,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST ACCESS_TOKEN NOT ADMIN RESPONDS WITH JSON", function (done) {
    request(app)
      .put("/products/2")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: 3,
      })
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST STOCK FILLED WITH MINUS NUMBER RESPONDS WITH JSON", function (done) {
    request(app)
      .put("/products/2")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 100000,
        stock: -1,
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST PRICE FILLED WITH MINUS NUMBER RESPONDS WITH JSON", function (done) {
    request(app)
      .put("/products/2")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: -1,
        stock: 2,
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST STOCK FILLED WITH STRING RESPONDS WITH JSON", function (done) {
    request(app)
      .put("/products/2")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: "angka",
      })
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
});

// DELETE
describe("test failed crud products", function () {
  it("TEST FAILED WITHOUT ACCESS TOKEN RESPONDS WITH JSON", function (done) {
    request(app)
      .delete("/products/2")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: 1,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
  it("TEST ACCESS_TOKEN NOT ADMIN RESPONDS WITH JSON", function (done) {
    request(app)
      .delete("/products/2")
      .send({
        name: "Kemeja Flanel",
        image_url:
          "https://id-live-01.slatic.net/p/9853cd1dce75b10c510f3a4314f6e204.jpg",
        price: 150000,
        stock: 3,
      })
      .set("access_token", token)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty(Object.keys(response.body));
        done();
      });
  });
});
