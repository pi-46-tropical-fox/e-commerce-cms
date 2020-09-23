const request = require("supertest");
const app = require("../app");

describe("test user login POST /login", function () {
    it("TEST SUCCESS LOGIN RESPONDS WITH JSON", function (done) {
        request(app)
        .post("/login")
        .send({ email: "merchika@gmail.com", password: "12345" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response;
            expect(status).toBe(200);
            expect(body).toHaveProperty("email", "merchika@gmail.com");
            expect(body).toHaveProperty("access_token", expect.any(String));
            done();
        });
    });
});

describe("test user login POST /login", function () {
    it("TEST FAILED LOGIN PASSWORD RESPONDS WITH JSON", function (done) {
        request(app)
        .post("/login")
        .send({ email: "merchika@gmail.com", password: "wrongPass" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty(Object.keys(response.body));
            done();
        });
    });

    it("TEST FAILED LOGIN EMAIL NOT REGISTERED IN DATABASE WITH JSON", function (done) {
        request(app)
        .post("/login")
        .send({ email: "dummyemail@mail.com", password: "wrongPass" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty(Object.keys(response.body));
            done();
        });
    });

    it("TEST FAILED LOGIN EMAIL AND PASSWORD FILLED WITH BLANK SPACE WITH JSON", function (done) {
        request(app)
        .post("/login")
        .send({ email: "", password: "" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
            const { body, status } = response;
            expect(status).toBe(400);
            expect(body).toHaveProperty(Object.keys(response.body));
            done();
        });
    });
});