const { sequelize } = require("../models")
const { queryInterface } = sequelize
const request = require("supertest")
const app = require("../app.js")

const passwordHash = require("../helpers/passwordHash")


let access_token;
let customer_access_token;
let idOfTestData;
let idOfFailedTestData;

beforeAll(function (done) {
	let adminData = {
		email: "admin@mail.com",
		password: passwordHash("1234"),
		role: "admin",
		createdAt: new Date(),
		updatedAt: new Date()
	}

	let customerData = {
		email: "customern@mail.com",
		password: passwordHash("1234"),
		role: "customer",
		createdAt: new Date(),
		updatedAt: new Date()
	}

	queryInterface.bulkInsert("Users", [adminData, customerData], {})
		.then(() => {
			request(app)
				.post("/users/login")
				.send({
					email: adminData.email,
					password: "1234"
				})
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					access_token = response.body.access_token
					return access_token


				})
		})
		.then(() => {
			request(app)
			.post("/users/login")
			.send({
				email: customerData.email,
				password: "1234"
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				customer_access_token = response.body.access_token
				// console.log(access_token, customer_access_token)
				done()
				return customer_access_token
			})
		})
		.catch((err) => done())
})

afterAll(function (done) {
	queryInterface.bulkDelete("Products", null, {})
		.then(() => {
			queryInterface.bulkDelete("Users", null, {})
			done()
		})
		.catch((err) => done())
})

describe("MODEL Product", function () {
	describe("Success Test Case", function () {
		test("Successfully add product to database", function (done) {

			request(app)
				.post("/products")
				.send({
					name: "The Witcher 3: Wild Hunt",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: 500000,
					stock: 12,
					CategoryId: 2,
				})
				.set("access_token", access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body).toHaveProperty("id")
					expect(body).toHaveProperty("name", "The Witcher 3: Wild Hunt")
					expect(body).toHaveProperty("image_url", "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg")
					expect(body).toHaveProperty("price", 500000)
					expect(body).toHaveProperty("stock", 12)
					expect(body).toHaveProperty("CategoryId", 2)
					expect(status).toBe(201)
					done()
					return idOfTestData = body.id
				})
		})

		test("Successfully read all products data from database", function(done){

			request(app)
				.get("/products")
				.set("access_token", access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(res => {
					const { body, status } = res
					// expect(typeof body[0]).toBe("object")
					expect(status).toBe(200)
					done()
				})
		})

		test("Successfully update a product in database", function(done){
			request(app)
				.put(`/products/${idOfTestData}`)
				.send({
					name: "The Witcher 3: Wild Hunt GOTY",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: 400000,
					stock: 10,
					CategoryId: 1,
				})
				.set("access_token", access_token)
				.set("Accept", "application/json")
				// .expect("Content-Type", /json/)
				.then(res => {
					// console.log(res);
					const{body, status} = res
					// console.log(body);
					expect(body[0]).toBe(1)
					expect(status).toBe(200)
					done()
				})
		})
		
		test("Successfully delete a product from database", function(done){
			request(app)
				.delete(`/products/${idOfTestData}`)
				.set("access_token", access_token)
				.set("Accept", "application/json")
				// .expect("Content-Type", /json/)
				.then(res => {
					// console.log(res);
					const{body, status} = res
					// console.log(body);
					expect(status).toBe(200)
					done()
				})
		})

	})

	describe("Failed Test Case", function(){

		beforeEach((done) => {
			request(app)
			.post("/products")
			.send({
				name: "The Witcher 3: Wild Hunt",
				image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
				price: 500000,
				stock: 12,
				CategoryId: 2,
			})
			.set("access_token", access_token)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const { body, status } = response
				done()
				return idOfFailedTestData = body.id
			})
		})

		describe("Add", function(){		//ADD

			test("Access token not provided", function(done){
				request(app)
				.post("/products")
				.send({
					name: "The Witcher 3: Wild Hunt",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: 500000,
					stock: 12,
					CategoryId: 2,
				})
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("unauthenticated user")
					expect(status).toBe(401)
					done()
				})
			})
			
			test("User's role's not authorized", function(done){
				request(app)
				.post("/products")
				.send({
					name: "The Witcher 3: Wild Hunt",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: 500000,
					stock: 12,
					CategoryId: 2,
				})
				.set("access_token", customer_access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Forbidden access")
					expect(status).toBe(403)
					done()
				})
			})

			test("Field's value is null", function(done){
				request(app)
				.post("/products")
				.send({
					name: "",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: 500000,
					stock: 12,
					CategoryId: 2,
				})
				.set("access_token", access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Field(s) can't be null")
					expect(status).toBe(400)
					done()
				})
			})

			test("Stock value's invalid", function(done){
				request(app)
				.post("/products")
				.send({
					name: "The Witcher 3: Wild Hunt",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: 500000,
					stock: -12,
					CategoryId: 2,
				})
				.set("access_token", access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Stock's value can't be a negative number")
					expect(status).toBe(400)
					done()
				})
			})

			test("Price value's invalid", function(done){
				request(app)
				.post("/products")
				.send({
					name: "The Witcher 3: Wild Hunt",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: -500000,
					stock: 12,
					CategoryId: 2,
				})
				.set("access_token", access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Price's value can't be a negative number")
					expect(status).toBe(400)
					done()
				})
			})

			test("Field(s) value's invalid", function(done){
				request(app)
				.post("/products")
				.send({
					name: "The Witcher 3: Wild Hunt",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: "asdf",
					stock: 12,
					CategoryId: 2,
				})
				.set("access_token", access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Only numbers allowed for price")
					expect(status).toBe(400)
					done()
				})
			})
		})

		describe("Update", function(){		//UPDATE

			test("Access token not provided", function(done){
				request(app)
				.put(`/products/${idOfFailedTestData}`)
				.send({
					name: "The Witcher 3: Wild Hunt GOTY",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: 700000,
					stock: 10,
					CategoryId: 2,
				})
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("unauthenticated user")
					expect(status).toBe(401)
					done()
				})
			})

			test("User's role's not authorized", function(done){
				request(app)
				.put(`/products/${idOfFailedTestData}`)
				.send({
					name: "The Witcher 3: Wild Hunt GOTY",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: 700000,
					stock: 10,
					CategoryId: 2,
				})
				.set("access_token", customer_access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Forbidden access")
					expect(status).toBe(403)
					done()
				})
			})

			test("Price value's invalid", function(done){
				request(app)
				.put(`/products/${idOfFailedTestData}`)
				.send({
					name: "The Witcher 3: Wild Hunt",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: -500000,
					stock: 12,
					CategoryId: 2,
				})
				.set("access_token", access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Price's value can't be a negative number")
					expect(status).toBe(400)
					done()
				})
			})

			test("Stock value's invalid", function(done){
				request(app)
				.put(`/products/${idOfFailedTestData}`)
				.send({
					name: "The Witcher 3: Wild Hunt",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: 500000,
					stock: -12,
					CategoryId: 2,
				})
				.set("access_token", access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Stock's value can't be a negative number")
					expect(status).toBe(400)
					done()
				})
			})

			test("Field(s) value's invalid", function(done){
				request(app)
				.put(`/products/${idOfFailedTestData}`)
				.send({
					name: "The Witcher 3: Wild Hunt GOTY",
					image_url: "https://www.mobygames.com/images/covers/l/319393-the-witcher-3-wild-hunt-playstation-4-front-cover.jpg",
					price: "asdf",
					stock: 12,
					CategoryId: 2,
				})
				.set("access_token", access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Only numbers allowed for price")
					expect(status).toBe(400)
					done()
				})
			})
		})

		describe("Delete", function(){

			test("Access token not provided", function(done){
				request(app)
				.delete(`/products/${idOfFailedTestData}`)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("unauthenticated user")
					expect(status).toBe(401)
					done()
				})
			})

			test("User's role's not authorized", function(done){
				request(app)
				.delete(`/products/${idOfFailedTestData}`)
				.set("access_token", customer_access_token)
				.set("Accept", "application/json")
				.expect("Content-Type", /json/)
				.then(response => {
					const { body, status } = response
					expect(body.errors[0]).toBe("Forbidden access")
					expect(status).toBe(403)
					done()
				})
			})

		})
	})
})

