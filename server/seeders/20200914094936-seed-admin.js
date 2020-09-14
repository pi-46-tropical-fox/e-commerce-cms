'use strict';
const { generatePass } = require('../helpers/bcrypt')

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
     "Users",
     [
       {
         email: "rachimawan@gmail.com",
         password: generatePass("r4ch1m4w4n"),
         role: "Admin",
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ],
     {}
   )
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
