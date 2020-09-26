"use strict";

const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

describe("POST /users/login", () => {
	it("success test case", done => {
		const user = {
			email: "admin1@mail.com",
			password: "admin1"
		};
		return request(app)
			.post("/users/login")
			.send(user)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const { status, body } = response;
				expect(status).toBe(200);
				expect(body).toHaveProperty("access_token", expect.any(String));
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	it("failed test case 1 : correct email, wrong password", done => {
		const user = {
			email: "admin1@mail.com",
			password: "admin2"
		};
		return request(app)
			.post("/users/login")
			.send(user)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const { status, body } = response;
				expect(status).toBe(400);
				expect(body).toEqual({ message: "The email or password is invalid." });
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	it("failed test case 2 : email doesn't exist", done => {
		const user = {
			email: "admin4@mail.com",
			password: "admin4"
		};
		return request(app)
			.post("/users/login")
			.send(user)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const { status, body } = response;
				expect(status).toBe(400);
				expect(body).toEqual({ message: "The email or password is invalid." });
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	it("failed test case 3 : empty email and password", done => {
		const user = {
			email: "",
			password: ""
		};
		return request(app)
			.post("/users/login")
			.send(user)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const { status, body } = response;
				expect(status).toBe(400);
				expect(body).toEqual({ message: "The email or password is invalid." });
				done();
			})
			.catch(err => {
				done(err);
			});
	});
});
