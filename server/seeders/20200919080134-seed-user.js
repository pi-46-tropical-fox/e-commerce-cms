'use strict';

const bcrypt = require('bcryptjs')
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
   let passwordAdmin = '123456'

   const salt = bcrypt.genSaltSync(9)
   passwordAdmin = bcrypt.hashSync(passwordAdmin, salt)
   await queryInterface.bulkInsert('Users', [
     {
       email: 'admin@mail.com',
       password: passwordAdmin,
       role: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
     }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
