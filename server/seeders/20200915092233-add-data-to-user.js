'use strict';
const { hashPass } = require('../helpers/hashPass')

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
    try {
      await queryInterface.bulkInsert('Users', [
        {
          email: 'bla@mail.com',
          password: hashPass('12345'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'kab@mail.com',
          password: hashPass('12345'),
          role: 'member',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
    } catch (err) {
      console.log(err)
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
