'use strict';
const bcrypt = require('bcrypt')

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
   
   await queryInterface.bulkInsert('Users',
   [{
    name: 'Obos',
    email: 'admin@mail.com',
    password: bcrypt.hashSync('1234', 8),
    role:'admin',
    createdAt : new Date(),
    updatedAt: new Date()
  }]
)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null,{})
    }
};