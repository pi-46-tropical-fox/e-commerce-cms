"use strict";

const request = require("supertest");
const app = require("../app");
const { sequelize, User, Product } = require("../models");
const { queryInterface } = sequelize;
const { generate_jwt_token } = require("../helpers/jwt");

const user = {
	email: "admin1@mail.com",
	password: "admin1"
};

const new_product = {
	name: "t-shirt",
	image_url: "https://cdn.psdrepo.com/images/2x/free-realistic-t-shirt-mockup-n4.jpg",
	price: 100000,
	stock: 10,
	category: "clothes"
};

const updated_product = {
	name: "t-shirt",
	image_url: "https://cdn.psdrepo.com/images/2x/free-realistic-t-shirt-mockup-n4.jpg",
	price: 150000,
	stock: 20,
	category: "clothes"
};

afterAll(done => {
    queryInterface.bulkDelete("Products", null, {})
	    .then(() => {
	    	done();
	    })
	    .catch(err => {
	        done(err)
	    });
});

describe("POST /products", () => {
	it("success test case", done => {
		return User.findOne({
			where: {
				email: user.email
			}
		})
			.then(user => {
				const access_token = generate_jwt_token(user);
				return request(app)
					.post("/products")
					.send(new_product)
					.set("access_token", access_token)
					.set("Accept", "application/json")
					.expect("Content-Type", /json/)
			})
			.then(response => {
				const { status, body } = response;
				expect(status).toBe(201);
				expect(body).toHaveProperty("name", new_product.name);
				expect(body).toHaveProperty("image_url", new_product.image_url);
				expect(body).toHaveProperty("price", new_product.price);
				expect(body).toHaveProperty("stock", new_product.stock);
				expect(body).toHaveProperty("category", new_product.category);
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	// it("failed test case 1 : no access_token", done => {
	// 	return request(app)
	// 		.post("/products")
	// 		.send(new_product)
	// 		// .set("access_token", access_token)
	// 		.set("Accept", "application/json")
	// 		.expect("Content-Type", /json/)
	// 		.then(response => {
	// 			const { status, body } = response;
	// 			expect(status).toBe(401);
	// 			expect(body).toEqual({ message: "The user is not authenticated." });
	// 			done();
	// 		})
	// 		.catch(err => {
	// 			done(err);
	// 		});
	// });
});

// describe("GET /products", () => {
// 	it("test on 'read all products' feature", done => {
// 		return User.findOne({
// 			where: {
// 				email: user.email
// 			}
// 		})
// 			.then(user => {
// 				const access_token = generate_jwt_token(user);
// 				return request(app)
// 					.get("/products")
// 					.set("access_token", access_token)
// 					.set("Accept", "application/json")
// 					.expect("Content-Type", /json/)
// 			})
// 			.then(response => {
// 				const { status, body } = response;
// 				expect(status).toBe(200);
// 				expect(body[0]).toHaveProperty("name", new_product.name);
// 				expect(body[0]).toHaveProperty("image_url", new_product.image_url);
// 				expect(body[0]).toHaveProperty("price", new_product.price);
// 				expect(body[0]).toHaveProperty("stock", new_product.stock);
// 				expect(body[0]).toHaveProperty("category", new_product.category);
// 				done();
// 			})
// 			.catch(err => {
// 				done(err);
// 			});
// 	});
// });

// describe("PUT /products", () => {
// 	it("test on 'update product' feature", done => {
// 		let access_token;
// 		return User.findOne({
// 			where: {
// 				email: user.email
// 			}
// 		})
// 			.then(user => {
// 				access_token = generate_jwt_token(user);
// 				return Product.findOne({
// 					where: {
// 						name: "t-shirt"
// 					}
// 				})
// 			})
// 			.then(product => { console.log({ access_token }, "line 137")
// 				return request(app)
// 					.put(`/products/${product.id}`)
// 					.send(updated_product)
// 					.set("access_token", access_token)
// 					.set("Accept", "application/json")
// 					.expect("Content-Type", /json/)
// 			})
// 			.then(response => {
// 				const { status, body } = response;
// 				expect(status).toBe(200);
// 				expect(body).toHaveProperty("name", updated_product.name);
// 				expect(body).toHaveProperty("image_url", updated_product.image_url);
// 				expect(body).toHaveProperty("price", updated_product.price);
// 				expect(body).toHaveProperty("stock", updated_product.stock);
// 				expect(body).toHaveProperty("category", updated_product.category);
// 				done();
// 			})
// 			.catch(err => {
// 				done(err);
// 			});
// 	});
// });

// describe("DELETE /products", () => {
// 	it("test on 'delete product' feature", done => {
// 		let access_token;
// 		return User.findOne({
// 			where: {
// 				email: user.email
// 			}
// 		})
// 			.then(user => {
// 				access_token = generate_jwt_token(user);
// 				return Product.findOne({
// 					where: {
// 						name: "t-shirt"
// 					}
// 				})
// 			})
// 			.then(product => {
// 				return request(app)
// 					.delete(`/products/${product.id}`)
// 					.set("access_token", access_token)
// 					.set("Accept", "application/json")
// 					.expect("Content-Type", /json/)
// 			})
// 			.then(response => {
// 				const { status, body } = response;
// 				expect(status).toBe(200);
// 				expect(body).toHaveProperty("name", updated_product.name);
// 				expect(body).toHaveProperty("image_url", updated_product.image_url);
// 				expect(body).toHaveProperty("price", updated_product.price);
// 				expect(body).toHaveProperty("stock", updated_product.stock);
// 				expect(body).toHaveProperty("category", updated_product.category);
// 				done();
// 			})
// 			.catch(err => {
// 				done(err);
// 			});
// 	});
// });
