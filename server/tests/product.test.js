const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User, Product } = require("../models");
const { generateToken } = require("../helpers/jwt");

let access_token = "";
let anotherToken = "";
let idRoute = 0;
let allProduct = [];

beforeAll(async(done) => {
  const userAdmin = {
    username: "admin",
    email: "admin@mail.com",
    password: "adminganteng",
    role: "admin"
  };

  const userNotAdmin = {
    username: "noname",
    email: "noname@mail.com",
    password: "sukangode",
    role: "customer"
  };

  try {
    const user = await User.create(userAdmin);
    access_token = generateToken(user);

    const notAdmin = await User.create(userNotAdmin);
    anotherToken = generateToken(notAdmin);
    done();

  } catch(err) {
    done(err);
  }
});

afterAll(async(done) => {
  try {
    await queryInterface.bulkDelete("Products", {});
    await queryInterface.bulkDelete("Users", {});
    done();
  } catch(err) {
    done(err);
  }
});

describe("Product Endpoints Tests", () => {
  
  describe("POST /products", () => {

    const addProduct = {
      name: "MacBook Pro 2020",
      image_url: "https://m.media-amazon.com/images/I/71pC69I3lzL._AC_UY327_FMwebp_QL65_.jpg",
      price: 36000000,
      stock: 20,
      category: "Electronics"
    };

    test("201:Created, return json with product's data", (done) => {
      request(app)
      .post("/products")
      .send(addProduct)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        idRoute = body.id;
        allProduct.push(body);
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", addProduct.name);
        expect(body).toHaveProperty("image_url", addProduct.image_url);
        expect(body).toHaveProperty("price", addProduct.price);
        expect(body).toHaveProperty("stock", addProduct.stock);
        expect(body).toHaveProperty("createdAt", expect.anything());
        expect(body).toHaveProperty("updatedAt", expect.anything());
        done();
      })
      .catch((err) => {
        done(err);
      });
    })

    const notAuthMsg = [
      "User is not authenticated"
    ];

    test("401:Missing access_token, return json with error messages", (done) => {
      request(app)
      .post("/products")
      .send(addProduct)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("errors", notAuthMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
    
    const invalidTokenMsg = [
      "Unauthorized Access"
    ]

    test("403:Invalid access_token, return json with error messages", (done) => {
      request(app)
      .post("/products")
      .send(addProduct)
      .set("access_token", anotherToken)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("errors", invalidTokenMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const emptyAddProduct = {
      name: "",
      image_url: "",
      price: "",
      stock: "",
      category: ""
    };

    const emptyAddProductMsg = [
      "Name cannot be left blank!",
      "Image url cannot be left blank!",
      "Please insert a valid url!",
      "Price cannot be left blank!",
      "Price must be in numeric format!",
      "Stock cannot be left blank!",
      "Stock must be in numeric format!",
      "Category cannot be left blank!"
    ];

    test("400:Empty field, return json with error messages", (done) => {
      request(app)
      .post("/products")
      .send(emptyAddProduct)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", emptyAddProductMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const minusStock = {
      name: "MacBook Pro 2020",
      image_url: "https://m.media-amazon.com/images/I/71pC69I3lzL._AC_UY327_FMwebp_QL65_.jpg",
      price: 36000000,
      stock: -20,
      category: "Electronics"
    };

    const minusStockMsg = [
      "Stock must be greater than or equals to 0"
    ]

    test("400:Minus Stock, return json with error messages", (done) => {
      request(app)
      .post("/products")
      .send(minusStock)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", minusStockMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const minusPrice = {
      name: "MacBook Pro 2020",
      image_url: "https://m.media-amazon.com/images/I/71pC69I3lzL._AC_UY327_FMwebp_QL65_.jpg",
      price: -36000000,
      stock: 20,
      category: "Electronics"
    };

    const minusPriceMsg = [
      "Price must be greater than or equals to 0"
    ]

    test("400:Minus Price, return json with error messages", (done) => {
      request(app)
      .post("/products")
      .send(minusPrice)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", minusPriceMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const invalidDataTypes = {
      name: "MacBook Pro 2020",
      image_url: 5000,
      price: "mahal",
      stock: "habis",
      category: "Electronics"
    };

    const invalidDataTypesMsg = [
      "Please insert a valid url!",
      "Price must be in numeric format!",
      "Stock must be in numeric format!"
    ]

    test("400:Invalid data types, return json with error messages", (done) => {
      request(app)
      .post("/products")
      .send(invalidDataTypes)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", invalidDataTypesMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

  });

  describe("GET /products", () => {
    test("200:OK, return json with product's data", (done) => {
      request(app)
      .get("/products")
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(allProduct);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe("PUT /products/:id", () => {

    const editProduct = {
      name: "MacBook Pro 2020",
      image_url: "https://m.media-amazon.com/images/I/71pC69I3lzL._AC_UY327_FMwebp_QL65_.jpg",
      price: 30000000,
      stock: 20,
      category: "Electronics"
    }

    test("200:OK, return json with product's data", (done) => {
      request(app)
      .put(`/products/${idRoute}`)
      .send(editProduct)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", editProduct.name);
        expect(body).toHaveProperty("image_url", editProduct.image_url);
        expect(body).toHaveProperty("price", editProduct.price);
        expect(body).toHaveProperty("stock", editProduct.stock);
        expect(body).toHaveProperty("createdAt", expect.anything());
        expect(body).toHaveProperty("updatedAt", expect.anything());
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const notAuthMsg = [
      "User is not authenticated"
    ];

    test("401:Missing access_token, return json with error messages", (done) => {
      request(app)
      .put(`/products/${idRoute}`)
      .send(editProduct)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("errors", notAuthMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const invalidTokenMsg = [
      "Unauthorized Access"
    ]

    test("403:Invalid access_token, return json with error messages", (done) => {
      request(app)
      .put(`/products/${idRoute}`)
      .send(editProduct)
      .set("access_token", anotherToken)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("errors", invalidTokenMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const minusStock = {
      name: "MacBook Pro 2020",
      image_url: "https://m.media-amazon.com/images/I/71pC69I3lzL._AC_UY327_FMwebp_QL65_.jpg",
      price: 36000000,
      stock: -20,
      category: "Electronics"
    };

    const minusStockMsg = [
      "Stock must be greater than or equals to 0"
    ]

    test("400:Minus Stock, return json with error messages", (done) => {
      request(app)
      .put(`/products/${idRoute}`)
      .send(minusStock)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", minusStockMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const invalidDataTypes = {
      name: "MacBook Pro 2020",
      image_url: 5000,
      price: "mahal",
      stock: "habis",
      category: "Electronics"
    };

    const invalidDataTypesMsg = [
      "Please insert a valid url!",
      "Price must be in numeric format!",
      "Stock must be in numeric format!"
    ]

    test("400:Invalid data types, return json with error messages", (done) => {
      request(app)
      .put(`/products/${idRoute}`)
      .send(invalidDataTypes)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", invalidDataTypesMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
    
    const minusPrice = {
      name: "MacBook Pro 2020",
      image_url: "https://m.media-amazon.com/images/I/71pC69I3lzL._AC_UY327_FMwebp_QL65_.jpg",
      price: -36000000,
      stock: 20,
      category: "Electronics"
    };

    const minusPriceMsg = [
      "Price must be greater than or equals to 0"
    ]

    test("400:Minus Price, return json with error messages", (done) => {
      request(app)
      .put(`/products/${idRoute}`)
      .send(minusPrice)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", minusPriceMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

  });

  describe("DELETE /products/:id", () => {

    const deleteSuccessMsg = "Product has been deleted successfully";

    test("200:OK, return json with product's data", (done) => {
      request(app)
      .delete(`/products/${idRoute}`)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", deleteSuccessMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const notAuthMsg = [
      "User is not authenticated"
    ];

    test("401:Missing access_token, return json with error messages", (done) => {
      request(app)
      .delete(`/products/${idRoute}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("errors", notAuthMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    const invalidTokenMsg = [
      "Unauthorized Access"
    ]

    test("403:Invalid access_token, return json with error messages", (done) => {
      request(app)
      .delete(`/products/${idRoute}`)
      .set("access_token", anotherToken)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("errors", invalidTokenMsg);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

  });

});