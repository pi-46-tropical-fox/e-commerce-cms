'use strict';
const bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@mail.com',
        password: bcrypt.hashSync('123456', salt),
        role: 'admin',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
      email: 'user@mail.com',
      password: bcrypt.hashSync('123456', salt),
      role: 'user',
      createdAt: new Date,
      updatedAt: new Date
      },
    ], {})
    
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
