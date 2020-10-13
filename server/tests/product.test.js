const request = require("supertest");
const { sequelize } = require("../models");
const { User, Product } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;
const app = require("../app.js");

let token = "";
let access_token = "";

beforeAll(async () => {
  let user1 = {
    email: "user1@mail.com",
    password: "12345",
    role: "admin",
  };

  let user2 = {
    email: "user2@mail.com",
    password: "12345",
    role: "nonAdmin",
  };

  let userAdmin = await User.create(user1);
  let data = {
    email: userAdmin.email,
    role: userAdmin.role,
    id: userAdmin.id,
  };
  access_token = generateToken(data);
  // onsole.log(access_token, 'ini access token');

  let nonAdmin = await User.create(user2);
  let data2 = {
    email: nonAdmin.email,
    role: nonAdmin.role,
    id: nonAdmin.id,
  };
  token = generateToken(data2);
});

afterAll(async (done) => {
  try {
    await queryInterface.bulkDelete("Products", null);
    await queryInterface.bulkDelete("Users", null);
    done();
  } catch (err) {
    done(err);
  }
});

let product = {
  name: "Celana Lepis",
  image_url:
    "https://static3.cbrimages.com/wordpress/wp-content/uploads/2020/01/Levi.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5",
  price: 300000,
  stock: 20,
  category: "Pakaian",
};

describe("test add Product POST/products", function () {
  test("201:created, return json with product's data", (done) => {
    request(app)
      .post("/products")
      .send(product)
      .set(`access_token`, access_token)
      .then((result) => {
        const { status, body } = result;
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", product.name);
        expect(body).toHaveProperty("image_url", product.image_url);
        expect(body).toHaveProperty("price", product.price);
        expect(body).toHaveProperty("stock", product.stock);
        expect(body).toHaveProperty("createdAt", expect.anything());
        expect(body).toHaveProperty("updatedAt", expect.anything());
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

///ERROR FOR ADD
describe("Test failed in add product POST /products", function () {
  describe("Test failed add product without access token", function () {
    test("403:User not Authorized, return with json error", function (done) {
      request(app)
        .post("/products")
        .send(product)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(403);
          expect(body).toHaveProperty(Object.keys(result.body));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Test failed add product with empty string", function () {
    test("400: Bad Request, return with json error", function (done) {
      request(app)
        .post("/products")
        .send({
          name: "",
          image_url: "maxresdefault.jpg",
          price: 300000,
          stock: 20,
          category: "Pakaian",
        })
        .set(`access_token`, access_token)
        .then((result) => {
          const { body, status } = result;

          expect(status).toBe(400);
          expect(body).toHaveProperty(Object.keys(result.body));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Test failed price filled with minus number", function () {
    test("400:Bad Request, return with json error", function (done) {
      request(app)
        .post("/products")
        .send({
          name: "Celana Lepis",
          image_url: "maxresdefault.jpg",
          price: -1,
          stock: 20,
          category: "Pakaian",
        })
        .set(`access_token`, access_token)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(400);
          expect(body).toHaveProperty(Object.keys(result.body));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Test failed stock filled with minus number", function () {
    test("400:Bad Request, return with json error", function (done) {
      request(app)
        .post("/products")
        .send({
          name: "Celana Lepis",
          image_url: "maxresdefault.jpg",
          price: 300000,
          stock: -1,
          category: "Pakaian",
        })
        .set(`access_token`, access_token)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(400);
          expect(body).toHaveProperty(Object.keys(result.body));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    describe("Test failed price filled with string", function () {
      test("400:Bad Request, return with json error", function (done) {
        request(app)
          .post("/products")
          .send({
            name: "Celana Lepis",
            image_url: "maxresdefault.jpg",
            price: "seratus ribu",
            stock: 20,
            category: "Pakaian",
          })
          .set(`access_token`, access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(400);
            expect(body).toHaveProperty(Object.keys(result.body));
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Test failed in add product POST /products", function () {
      describe("Test failed stock filled with string", function () {
        test("400:Bad Request, return with json error", function (done) {
          request(app)
            .post("/products")
            .send({
              name: "Celana Lepis",
              image_url: "maxresdefault.jpg",
              price: 300000,
              stock: "sepuluh",
              category: "Pakaian",
            })
            .set(`access_token`, access_token)
            .then((result) => {
              const { body, status } = result;
              expect(status).toBe(400);
              expect(body).toHaveProperty(Object.keys(result.body));
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
      });

      describe("Test Failed Not Admin Access Admin Page", function () {
        test("403:Not Autherized, return with json error", function (done) {
          request(app)
            .post("/products")
            .send(product)
            .set(`access_token`, token)
            .then((result) => {
              const { body, status } = result;
              expect(status).toBe(403);
              expect(body).toHaveProperty(Object.keys(result.body));
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
      });
    });
  });
});

/// Success Edit
describe("test edit Product PUT/products", function () {
  test("200:created, return json with product's data", (done) => {
    request(app)
      .put("/products/1")
      .send({
        name: "Celana Lepis",
        image_url: "maxresdefault.jpg",
        price: 300000,
        stock: 10,
        category: "Pakaian",
      })
      .set(`access_token`, access_token)
      .then((result) => {
        const { status, body } = result;
        expect(status).toBe(201);
        expect(result).toHaveProperty("body", expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Test failed in Edit product PUT /products/:id", function () {
  describe("Test failed edit product with empty string", function () {
    test("400: Bad Request, return with json error", function (done) {
      request(app)
        .put("/products/1")
        .send({
          name: "",
          image_url: "maxresdefault.jpg",
          price: 300000,
          stock: 20,
          category: "Pakaian",
        })
        .set(`access_token`, access_token)
        .then((result) => {
          const { body, status } = result;

          expect(status).toBe(400);
          expect(body).toHaveProperty(Object.keys(result.body));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Test failed price filled with minus number", function () {
    test("400:Bad Request, return with json error", function (done) {
      request(app)
        .put("/products/1")
        .send({
          name: "Celana Lepis",
          image_url: "maxresdefault.jpg",
          price: -1,
          stock: 20,
          category: "Pakaian",
        })
        .set(`access_token`, access_token)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(400);
          expect(body).toHaveProperty(Object.keys(result.body));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Test failed stock filled with minus number", function () {
    test("400:Bad Request, return with json error", function (done) {
      request(app)
        .put("/products/1")
        .send({
          name: "Celana Lepis",
          image_url: "maxresdefault.jpg",
          price: 300000,
          stock: -1,
          category: "Pakaian",
        })
        .set(`access_token`, access_token)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(400);
          expect(body).toHaveProperty(Object.keys(result.body));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    describe("Test failed price filled with string", function () {
      test("400:Bad Request, return with json error", function (done) {
        request(app)
          .put("/products/1")
          .send({
            name: "Celana Lepis",
            image_url: "maxresdefault.jpg",
            price: "seratus ribu",
            stock: 20,
            category: "Pakaian",
          })
          .set(`access_token`, access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(400);
            expect(body).toHaveProperty(Object.keys(result.body));
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Test failed stock filled with string", function () {
      test("400:Bad Request, return with json error", function (done) {
        request(app)
          .put("/products/1")
          .send({
            name: "Celana Lepis",
            image_url: "maxresdefault.jpg",
            price: 300000,
            stock: "sepuluh",
            category: "Pakaian",
          })
          .set(`access_token`, access_token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(400);
            expect(body).toHaveProperty(Object.keys(result.body));
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe("Test Failed Not Admin Access Admin Page", function () {
      test("403:Not Autherized, return with json error", function (done) {
        request(app)
          .put("/products/1")
          .send(product)
          .set(`access_token`, token)
          .then((result) => {
            const { body, status } = result;
            expect(status).toBe(403);
            expect(body).toHaveProperty(Object.keys(result.body));
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});

describe("test delete Product Delete /products/:id", function () {
  test("200:created, return json with product's data", (done) => {
    request(app)
      .delete("/products/15")
      .set(`access_token`, access_token)
      .then((result) => {
        const { status, body } = result;
        console.log(body);
        expect(status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

//error delete
describe("Test Failed Delete Product Delete/Products/:id", function () {
  describe("Test failed add product without access token", function () {
    test("403:User not Authorized, return with json error", function (done) {
      request(app)
        .delete("/products/15")
        .send(product)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(403);
          expect(body).toHaveProperty(Object.keys(result.body));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Test Failed Not Admin Access Admin Page", function () {
    test("403:Not Autherized, return with json error", function (done) {
      request(app)
        .delete("/products/15")
        .send(product)
        .set(`access_token`, token)
        .then((result) => {
          const { body, status } = result;
          expect(status).toBe(403);
          expect(body).toHaveProperty(Object.keys(result.body));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
