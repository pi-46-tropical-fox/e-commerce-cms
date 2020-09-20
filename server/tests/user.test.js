const {sequelize} = require("../models")
const {queryInterface} = sequelize
const request = require("supertest")
const app = require("../app.js")
const passwordHash = require("../helpers/passwordHash")

let user = {
	email: "dummy@dumbest.com",
	password: "Dumbest_123",
	name: "dummy dumbest",	
	address: "dummy street, no. dummy",
	phone: "08123456789", 
	// role: "admin",
}
beforeAll (function(done){
	let adminData = {
        email: "admin@mail.com",
        password: passwordHash("1234"),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      }

	queryInterface.bulkInsert("Users", [adminData], {})
		.then(() => done())
		.catch((err)=> done())
})

afterAll (function(done){
	queryInterface.bulkDelete("Users")
		.then(() => done())
		.catch((err)=> done())
})

describe("FEATURE Register", function(){
	describe("Success Test Case", function(){
		test("Admin successfully registered", function(done){
			request(app)
			.post("/users/register")
			.send({
				email: user.email,
				password: user.password,
				role: "admin"
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const {body, status} = response

				expect(body).toMatchObject({
					email: user.email,
					message: "Registration success"
				})
				expect(status).toBe(201)

				done()
				
			})
		})

		test("Customer successfully registered", function(done){
			request(app)
			.post("/users/register")
			.send({
				email: "customer@dumbest.com",
				password: user.password,
				name: user.name,
				address: user.address,
				phone: user.phone,
				role: "customer"
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const {body, status} = response
				expect(body).toMatchObject({
					email: "customer@dumbest.com",
					name: user.name,
					address: user.address,
					phone: user.phone,
					message: "Registration success"
				})
				expect(status).toBe(201)

				done()
			})
		})


	})

	describe("Failed Test Case", function(){
		test("Duplicate email: email must be unique", function(done){
			request(app)
			.post("/users/register")
			.send({
				email: "admin@mail.com",
				password: "Admin_123",
				role: "admin"
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const{body, status} = response
				expect(body.errors[0]).toBe("email must be unique")
				expect(status).toBe(400)

				done()
			})
		})

		test("Invalid password format: Password must contain at least 8 characters including at least a uppercase, a lowercase and a number", function(done){
			request(app)
			.post("/users/register")
			.send({
				email: "newAdmin@mail.com",
				password: "1234",
				role: "admin"
			})
			.set("Accept", "applicatoin/json")
			.expect("Content-Type", /json/)
			.then(response => {
				//Validation on User Model
				const{body, status} = response
				expect(body.errors[0]).toBe("Password must contain at least 8 characters including at least a uppercase, a lowercase and a number.") 
				expect(status).toBe(400)

				done()
			})
		})
	})
	
	
})


describe("FEATURE Login", function(){

	describe("Success Test Case", function(){
		test("User successfully login and receive access_token", function(done){
			request(app)
			.post("/users/login")
			.send({
				email: user.email,
				password: user.password
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				//admin and customer have a different access_token
				const{body, status} = response
				expect(body).toHaveProperty("access_token")
				expect(body.access_token).not.toBeNull()
				expect(status).toBe(200)
				done()
			})
		})
	})

	describe("Failed Test Case", function(){
		test("Invalid email: invalid email or password", function(done){
			request(app)
			.post("/users/login")
			.send({
				email: "thisEmailNotRegistered@mail.com",
				password: user.password
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const{body, status} = response
				expect(body.errors[0]).toBe("invalid email or password")
				expect(status).toBe(400)

				done()
			})
		})
		test("Invalid password: invalid email or password", function(done){
			request(app)
			.post("/users/login")
			.send({
				email: user.email,
				password: "invalidPassword"
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const{body, status} = response
				expect(body.errors[0]).toBe("invalid email or password")
				expect(status).toBe(400)

				done()
			})
		})
		test("Email and password null: email and password required", function(done){
			request(app)
			.post("/users/login")
			.send({
				email: null,
				password: null
			})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then(response => {
				const{body, status} = response
				expect(body.errors[0]).toBe("Email and password required")
				expect(status).toBe(400)

				done()
			})
		})
	})
})