require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const { generateToken } = require('../helpers/jwt');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { User, Category } = require('../models');

let access_token_admin;
let access_token_customer;

let category;

beforeAll(done => {
	User.create({
		email: 'admin@mail.com',
		password: '1234',
	})
		.then(user => {
			return User.update({ role: 'admin' }, { where: { id: user.id }, returning: true });
		})
		.then(userAdmin => {
			access_token_admin = generateToken({
				id: userAdmin[1][0].id,
				email: userAdmin[1][0].email,
				role: userAdmin[1][0].role,
			});

			return User.create({
				email: 'customer@mail.com',
				password: '1234',
			});
		})
		.then(userCustomer => {
			access_token_customer = generateToken({
				id: userCustomer.id,
				email: userCustomer.email,
				role: userCustomer.role,
			});
			return Category.create({
				name: 'Basic',
				slug: 'basic',
			});
		})
		.then(categoryBasic => {
			category = categoryBasic;
			done();
		})
		.catch(err => {
			done(err);
		});
});

afterAll(async done => {
	try {
		await queryInterface.bulkDelete('Users', null, {});
		await queryInterface.bulkDelete('Categories', null, {});
		done();
	} catch (error) {
		done(error);
	}
});

describe('GET /categories', function () {
	test(`200: Success get all categories, return json with categories data`, function (done) {
		const categories = [
			{
				id: category.id,
				name: category.name,
				slug: category.slug,
				createdAt: new Date(category.createdAt).toISOString(),
				updatedAt: new Date(category.updatedAt).toISOString(),
			},
		];
		request(app)
			.get('/categories')
			.then(response => {
				const { statusCode, body } = response;

				expect(statusCode).toBe(200);
				expect(body).toEqual(expect.arrayContaining(categories));
				done();
			})
			.catch(err => {
				done(err);
			});
	});
});

describe('GET /categories/:id', function () {
	test(`200: Success get category by id, return json with category's data`, function (done) {
		request(app)
			.get(`/categories/${category.id}`)
			.then(response => {
				const { statusCode, body } = response;

				expect(statusCode).toBe(200);
				expect(body).toEqual({
					id: category.id,
					name: category.name,
					slug: category.slug,
					createdAt: new Date(category.createdAt).toISOString(),
					updatedAt: new Date(category.updatedAt).toISOString(),
				});
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	test('404: Error category not found, return json with error', function (done) {
		const expectedErrors = [
			{
				name: 'notFoundCategory',
				message: 'Error category not found',
			},
		];

		request(app)
			.get(`/categories/1234`)
			.set('access_token', access_token_admin)
			.then(response => {
				const { statusCode, body } = response;

				expect(statusCode).toBe(404);
				expect(body.errors).toEqual(expect.arrayContaining(expectedErrors));
				done();
			})
			.catch(error => {
				done(error);
			});
	});
});
