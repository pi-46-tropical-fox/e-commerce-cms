'use strict';

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

let data = [
  {
    firstName: 'Abdul',
    lastName: 'Fattah',
    email: 'abdul@mail.com',
    password: bcrypt.hashSync('123456', salt),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Salman',
    lastName: 'Hamka',
    email: 'salman@mail.com',
    password: bcrypt.hashSync('123456', salt),
    role: 'customer',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
