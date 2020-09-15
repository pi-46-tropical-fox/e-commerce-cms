'use strict';
const { query } = require('express');
const bcryptjs = require('../helpers/bcryptjs')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin1@gmail.com',
      password: bcryptjs('123456'),
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'user1@gmail.com',
      password: bcryptjs('123456'),
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
