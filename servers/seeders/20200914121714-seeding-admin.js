'use strict';
const {hashing} = require(`../helpers/bcrypt`)
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
   await queryInterface.bulkInsert("Users", [
     {
       email: "admin1@mail.com",
       password: hashing("1234"),
       role: "admin",
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       email: "customer1@mail.com",
       password: hashing("1234"),
       role: "customer",
       createdAt: new Date(),
       updatedAt: new Date()
     }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
