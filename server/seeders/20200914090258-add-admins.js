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

    let data = [
      {
        name : 'admin',
        email : 'hal@g.com',
        role : 'admin',
        password : '1234',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : 'admin',
        email : 'admin@mail.com',
        role : 'admin',
        password : '1234',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      
    ]

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
