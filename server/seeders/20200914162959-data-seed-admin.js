'use strict';
const fs = require ("fs")
const {hash} = require ("../helpers/bcrypt.js")

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
  //  const dataAdmin = JSON.parse (fs.readFileSync ("./seeders/data.json", "utf-8"))
  //  dataAdmin.forEach (el => {
  //    el.createdAt = new Date (),
  //    el.updatedAt = new Date ()
  //  })
  //  return queryInterface.bulkInsert ("Users", dataAdmin)

  return queryInterface.bulkInsert ("Users", [
    {
      email: "admin1@email.com",
      password: hash("admin1"),
      // password: "admin1",
      role: "admin",
      createdAt: new Date (),
      updatedAt: new Date ()
    },

    {
      email: "admin2@email.com",
      password: hash("admin2"),
      // password: "admin2",
      role: "admin",
      createdAt: new Date (),
      updatedAt: new Date ()
    },

    {
      email: "admin3@email.com",
      password: hash("admin3"),
      // password: "admin3",
      role: "admin",
      createdAt: new Date (),
      updatedAt: new Date ()
    }
  ], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete ("Users", null, {})
  }
};
