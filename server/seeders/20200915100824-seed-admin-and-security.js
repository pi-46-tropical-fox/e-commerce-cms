'use strict';

const { hashPassword } = require('../helpers/bcryptjs')

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
   return await queryInterface.bulkInsert('Users', [
    {
      name: "samuel",
      email: "samuel@mail.com",
      password: hashPassword('samuel'),
      role: "admin",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "aming",
      email: "aming@mail.com",
      password: hashPassword('aming'),
      role: "security",
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ])
},

down: async (queryInterface, Sequelize) => {
  return await queryInterface.bulkDelete('Users', null, {})
}
};
