'use strict';

const { hashPassword } = require('../helpers/password')

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

    let data = [{
      name : 'Hal',
      email : 'hal@g.com',
      role : 'admin',
      password : 'password',
      createdAt : new Date(),
      updatedAt : new Date()
    }]

    data.forEach(e => {
      e.password = hashPassword(e.password)
    })

    console.log(data)

   await queryInterface.bulkInsert('Users', data)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User', null, {})
  }
};
