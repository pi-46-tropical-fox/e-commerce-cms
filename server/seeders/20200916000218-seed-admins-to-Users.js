'use strict';

const { generate_bcrypt_hash } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [{
      username: "admin1",
      email: "admin1@mail.com",
      password: generate_bcrypt_hash("admin1"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "admin2",
      email: "admin2@mail.com",
      password: generate_bcrypt_hash("admin2"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "admin3",
      email: "admin3@mail.com",
      password: generate_bcrypt_hash("admin3"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
