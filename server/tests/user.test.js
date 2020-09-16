"use strict";

const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

describe("POST /users/login", () => {
	it("test if a user can log in or not", done => {
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
});
