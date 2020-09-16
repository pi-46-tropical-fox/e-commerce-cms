const request = require("supertest");
const app = require("../app");
const { generateToken } = require("../helpers/jwt");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

const userData = { email: "admin@mail.com", password: "123456" };
const userData1 = { email: "user@mail.com", password: "123456" };
let access_token;
let access_token2;
let productId = 0

afterAll((done) => {
  queryInterface
    .bulkDelete("Products")
    .then(() => done())
    .catch((err) => {
      console.log(err);
      done();
    });
});
beforeAll((done) => {
  User.findOne({ where: { email: userData.email } })
    .then((user) => {
      access_token = generateToken(user);
      // done();
      return User.findOne({where:{email: userData1.email}})
    })
    .then((user2)=>{
      access_token2 = generateToken(user2)
      done()
    })
    .catch((err) => {
      console.log(err);
      done();
    });
});

// Success Test Product

describe("success test create product", function () {
  it("test success create product with post /product, responds with json", function (done) {
    request(app)
      .post("/product")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .send({
        name: "Lea Jeans",
        image_url:
          "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
        price: 489500,
        stock: 20,
      })
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        productId = body.id
        expect(status).toBe(201);
        expect(body).toHaveProperty("name", "Lea Jeans");
        expect(body).toHaveProperty(
          "image_url",
          "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509"
        );
        expect(body).toHaveProperty("price", 489500);
        expect(body).toHaveProperty("stock", 20);
        done();
      });
  });
});

describe("success test read product", function () {  
    it("test success read product with get /product, responds with json", function (done) {
      request(app)
        .get("/product")
        .set("Accept", "application/json")
        .set("access_token", access_token)
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          let result = [];
          body.forEach((el) => {
            let { id, name, image_url, price, stock, createdAt, updatedAt } = el;
            result.push({
              id,
              name,
              image_url,
              price,
              stock,
              createdAt,
              updatedAt,
            });
            expect(body).toEqual(result);
          });
          done();
        });
    });
});

describe("success test read product by id", function () {  
  it("test success read one product with get /product/:id, responds with json", function (done) {
    request(app)
      .get(`/product/${productId}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("name", expect.any(String));
        expect(body).toHaveProperty("image_url", expect.any(String));
        expect(body).toHaveProperty("price", expect.any(Number));
        expect(body).toHaveProperty("stock", expect.any(Number));
        expect(body).toHaveProperty("createdAt", expect.any(String));
        expect(body).toHaveProperty("updatedAt", expect.any(String));
        done();
      });
  });
});

describe("success test update product", function () {  
    it("test success update product with put /product/:id, responds with json", function (done) {
      request(app)
        .put(`/product/${productId}`)
        .set("Accept", "application/json")
        .set("access_token", access_token)
        .send({
          name: "Lea Jeans",
          image_url:
            "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
          price: 489500,
          stock: 1,
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("message", "Update Success");
          done();
        });
    });
});


// Fail Test Product

// Fail Create

describe("fail test create product without access_token", function () {
    it("test fail create product with post /product, responds with json", function (done) {
      request(app)
        .post("/product")
        .set("Accept", "application/json")
        // .set("access_token", access_token)
        .send({
          name: "Lea Jeans",
          image_url:
            "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
          price: 489500,
          stock: 20,
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "User Is Not Authenticate");
          done();
        });
    });
});

describe("fail test create product wrong access_token", function () {
    it("test fail create product with post /product, responds with json", function (done) {
      request(app)
        .post("/product")
        .set("Accept", "application/json")
        .set("access_token", access_token2)
        .send({
          name: "Lea Jeans",
          image_url:
            "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
          price: 489500,
          stock: 20,
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "User Is Not Authorize");
          done();
        });
    });
});

describe("fail test create product empty field", function () {
    it("test fail create product (empty name) with post /product, responds with json", function (done) {
      request(app)
        .post("/product")
        .set("Accept", "application/json")
        .set("access_token", access_token)
        .send({
          name: "",
          image_url:
            "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
          price: 489500,
          stock: 20,
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Name Must Be Filled");
          done();
        });
    });
    it("test fail create product (empty image) with post /product, responds with json", function (done) {
        request(app)
          .post("/product")
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url: "",
            price: 489500,
            stock: 20,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Image Must Be Filled");
            done();
          });
    });
    it("test fail create product (null price) with post /product, responds with json", function (done) {
        request(app)
          .post("/product")
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: null,
            stock: 20,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Price Must Be Filled");
            done();
          });
    });
    it("test fail create product (price is 0 or mines) with post /product, responds with json", function (done) {
        request(app)
          .post("/product")
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: -1,
            stock: 20,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Price Must Be More Than 0");
            done();
          });
    });
    it("test fail create product (price is not number) with post /product, responds with json", function (done) {
        request(app)
          .post("/product")
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: 'empat ratus ribu',
            stock: 20,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Please Input Number");
            done();
          });
    });
    it("test fail create product (null stock) with post /product, responds with json", function (done) {
        request(app)
          .post("/product")
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: 489500,
            stock: null,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Stock Must Be Filled");
            done();
          });
    });
    it("test fail create product (null is 0 or mines) with post /product, responds with json", function (done) {
        request(app)
          .post("/product")
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: 489500,
            stock: 0,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Stock Must Be More Than 0");
            done();
          });
    });
    it("test fail create product (stock is not number) with post /product, responds with json", function (done) {
        request(app)
          .post("/product")
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: 489500,
            stock: 'dua puluh',
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Please Input Number");
            done();
          });
    });
});


// Fail Update

describe("fail test update product without access_token", function () {
    it("test fail update product with put /product, responds with json", function (done) {
      request(app)
        .put("/product")
        .set("Accept", "application/json")
        // .set("access_token", access_token)
        .send({
          name: "Lea Jeans",
          image_url:
            "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
          price: 489500,
          stock: 1,
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "User Is Not Authenticate");
          done();
        });
    });
});
describe("fail test update product wrong access_token", function () {
    it("test fail update product with put /product, responds with json", function (done) {
      request(app)
        .put(`/product/${productId}`)
        .set("Accept", "application/json")
        .set("access_token", access_token2)
        .send({
          name: "Lea Jeans",
          image_url:
            "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
          price: 489500,
          stock: 1,
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "User Is Not Authorize");
          done();
        });
    });
});
describe("fail test update product empty field", function () {
    it("test fail update product (empty name) with put /product, responds with json", function (done) {
      request(app)
        .put(`/product/${productId}`)
        .set("Accept", "application/json")
        .set("access_token", access_token)
        .send({
          name: "",
          image_url:
            "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
          price: 489500,
          stock: 20,
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Name Must Be Filled");
          done();
        });
    });
    it("test fail update product (empty image) with put /product, responds with json", function (done) {
        request(app)
          .put(`/product/${productId}`)
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url: "",
            price: 489500,
            stock: 20,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Image Must Be Filled");
            done();
          });
    });
    it("test fail update product (null price) with put /product, responds with json", function (done) {
        request(app)
          .put(`/product/${productId}`)
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: null,
            stock: 20,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Price Must Be Filled");
            done();
          });
    });
    it("test fail update product (price is 0 or mines) with put /product, responds with json", function (done) {
        request(app)
          .put(`/product/${productId}`)
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: -1,
            stock: 20,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Price Must Be More Than 0");
            done();
          });
    });
    it("test fail update product (price is not number) with put /product, responds with json", function (done) {
        request(app)
          .put(`/product/${productId}`)
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: 'empat ratus ribu',
            stock: 20,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Please Input Number");
            done();
          });
    });
    it("test fail update product (null stock) with put /product, responds with json", function (done) {
        request(app)
          .put(`/product/${productId}`)
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: 489500,
            stock: null,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Stock Must Be Filled");
            done();
          });
    });
    it("test fail update product (stock is 0 or mines) with put /product, responds with json", function (done) {
        request(app)
          .put(`/product/${productId}`)
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: 489500,
            stock: 0,
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Stock Must Be More Than 0");
            done();
          });
    });
    it("test fail update product (stock is not number) with put /product, responds with json", function (done) {
        request(app)
          .put(`/product/${productId}`)
          .set("Accept", "application/json")
          .set("access_token", access_token)
          .send({
            name: "Lea Jeans",
            image_url:
              "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
            price: 489500,
            stock: 'dua puluh',
          })
          .expect("Content-Type", /json/)
          .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Please Input Number");
            done();
          });
    });
});

// Fail Delete

describe("fail test delete product without access_token", function () {
    it("test fail delete product with delete /product, responds with json", function (done) {
      request(app)
        .delete(`/product/${productId}`)
        .set("Accept", "application/json")
        // .set("access_token", access_token)
        .send({
          name: "Lea Jeans",
          image_url:
            "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
          price: 489500,
          stock: 20,
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "User Is Not Authenticate");
          done();
        });
    });
});
describe("fail test delete product wrong access_token", function () {
    it("test fail delete product with delete /product, responds with json", function (done) {
      request(app)
        .delete(`/product/${productId}`)
        .set("Accept", "application/json")
        .set("access_token", access_token2)
        .send({
          name: "Lea Jeans",
          image_url:
            "https://cdn.shopify.com/s/files/1/0028/5825/4382/files/Leajeans-webbanner-4x3-diskon10_1400x.jpg?v=1567404509",
          price: 489500,
          stock: 20,
        })
        .expect("Content-Type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(403);
          expect(body).toHaveProperty("message", "User Is Not Authorize");
          done();
        });
    });
});

// success delete

describe("success test delete product", function () {  
  it("test success update delete with delete /product/:id, responds with json", function (done) {
    request(app)
      .delete(`/product/${productId}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Delete Success");
        done();
      });
  });
});