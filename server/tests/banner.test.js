const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User, Banner } = require("../models");
const { generateToken } = require("../helpers/jwt");

let access_token = "";
let anotherToken = "";
let idRoute = 0;
let allBanner = [];

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

  } catch (err) {
    done(err);
  }
});

afterAll(async(done) => {
  try {
    await queryInterface.bulkDelete("Banners", {});
    await queryInterface.bulkDelete("Users", {});
    done();
  } catch (err) {
    done(err);
  }
});

describe("Banner Endpoint Tests", () => {

  describe("POST /banners", () => {

    const addBanner = {
      title: "Shipping Banner",
      status: false,
      image_url: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg" 
    };

    test("201:Created, return json with banner's data", (done) => {
      request(app)
      .post("/banners")
      .send(addBanner)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        idRoute = body.id;
        allBanner.push(body);
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("title", addBanner.title);
        expect(body).toHaveProperty("status", addBanner.status);
        expect(body).toHaveProperty("createdAt", expect.anything());
        expect(body).toHaveProperty("updatedAt", expect.anything());
        done();
      })
      .catch((err) => {
        done(err)
      })
    });

    const emptyAddBanner = {
      title: "",
      status: "",
      image_url: "" 
    };

    const emptyAddBannerMsg = [
      "Status must be boolean!",
      "Title cannot be left blank!",
      "Status cannot be left blank!",
      "Title cannot be left blank!",
      "Please insert a valid url!"
    ];

    test("400:Empty field, return json with error messages", (done) => {
      request(app)
      .post("/banners")
      .send(emptyAddBanner)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("errors", emptyAddBannerMsg);
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
      .post("/banners")
      .send(addBanner)
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
      .post("/banners")
      .send(addBanner)
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

    const invalidDataTypes = {
      title: "Shipping Banner",
      status: "inactive",
      image_url: "this is url" 
    };

    const invalidDataTypesMsg = [
      "Status must be boolean!",
      "Please insert a valid url!"
    ];

    test("400:Invalid data types, return json with error messages", (done) => {
      request(app)
      .post("/banners")
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

  describe("GET /banners", () => {

    test("200:OK, return json with banner's data", (done) => {
      request(app)
      .get("/banners")
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toEqual(allBanner);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe("PUT /banners/:id", ()  => {

    const editBanner = {
      title: "Shipping Banner 2020",
      status: true,
      image_url: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg" 
    };

    test("200:OK, return json with banner's data", (done) => {
      request(app)
      .put(`/banners/${idRoute}`)
      .send(editBanner)
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("title", editBanner.title);
        expect(body).toHaveProperty("status", editBanner.status);
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
      .put(`/banners/${idRoute}`)
      .send(editBanner)
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
      .put(`/banners/${idRoute}`)
      .send(editBanner)
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

    const invalidDataTypes = {
      title: "Shipping Banner",
      status: "inactive",
      image_url: "this is url" 
    };

    const invalidDataTypesMsg = [
      "Status must be boolean!",
      "Please insert a valid url!"
    ];

    test("400:Invalid data types, return json with error messages", (done) => {
      request(app)
      .put(`/banners/${idRoute}`)
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

  describe("DELETE /banners/:id", () => {

    const deleteSuccessMsg = "Banner has been deleted successfully";

    test("200:OK, return json with product's data", (done) => {
      request(app)
      .delete(`/banners/${idRoute}`)
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
      .delete(`/banners/${idRoute}`)
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
      .delete(`/banners/${idRoute}`)
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

  })

});