const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { User } = require('../models');

const userDataAdmin = {
	email: 'admin@mail.com',
	password: '1234',
};

const userDataCustomer = {
	email: 'customer@mail.com',
	password: '1234',
};

beforeAll(async done => {
	try {
		// Create & Update User as admin
		const userAdmin = await User.create(userDataAdmin);
		const userAdminUpdated = await User.update({ role: 'admin' }, { where: { id: userAdmin.id }, returning: true });
		// Create User as customer (default)
		const userCustomer = await User.create(userDataCustomer);

		done();
	} catch (error) {
		done(error);
	}
});

afterAll(async done => {
	try {
		await queryInterface.bulkDelete('Users', null, {});
		done();
	} catch (error) {
		done(error);
	}
});

describe('POST /login (User login as admin)', function () {
	test(`200: Success login as admin, return json with user's data`, function (done) {
		request(app)
			.post('/login')
			.send(userDataAdmin)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.then(response => {
				const { body, statusCode } = response;

				expect(statusCode).toBe(200);
				expect(body).toHaveProperty('id', expect.any(Number));
				expect(body).toHaveProperty('email', userDataAdmin.email);
				expect(body).toHaveProperty('access_token', expect.any(String));
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	test('400: Invalid Email or password, return json with error', function () {
		request(app)
			.post('/login')
			.send(userDataAdmin)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.then(response => {
				const { body, statusCode } = response;

				expect(statusCode).toBe(400);
				expect(body).not.toHaveProperty('id', expect.any(Number));
				expect(body).not.toHaveProperty('email', userDataAdmin.email);
				expect(body).not.toHaveProperty('access_token', expect.any(String));
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	test(`200: Success login as admin, return json with user's data`, function (done) {
		request(app)
			.post('/login')
			.send(userDataCustomer)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.then(response => {
				const { body, statusCode } = response;

				expect(statusCode).toBe(200);
				expect(body).toHaveProperty('id', expect.any(Number));
				expect(body).toHaveProperty('email', userDataCustomer.email);
				expect(body).toHaveProperty('access_token', expect.any(String));
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	test('400: Invalid Email or password, return json with error', function () {
		request(app)
			.post('/login')
			.send(userDataCustomer)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.then(response => {
				const { body, statusCode } = response;

				expect(statusCode).toBe(400);
				expect(body).not.toHaveProperty('id', expect.any(Number));
				expect(body).not.toHaveProperty('email', userDataCustomer.email);
				expect(body).not.toHaveProperty('access_token', expect.any(String));
				done();
			})
			.catch(err => {
				done(err);
			});
	});
});
