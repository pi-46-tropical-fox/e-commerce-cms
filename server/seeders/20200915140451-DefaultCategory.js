'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			'Categories',
			[
				{
					name: 'Fiction',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Non Fiction',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Fantasy',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'Biography',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Categories', null, {});
	},
};
