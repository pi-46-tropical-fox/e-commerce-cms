'use strict';

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
    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        category: "Bags",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        category: "Shirt",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        category: "Shoes",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        category: "Jeans",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        category: "Jacket",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        category: "Skirts",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        category: "Pants",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
