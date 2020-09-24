'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Admin E-Commerce',
      email: 'admin1@mail.com',
      password: bcrypt.hashSync('123456', 8),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
