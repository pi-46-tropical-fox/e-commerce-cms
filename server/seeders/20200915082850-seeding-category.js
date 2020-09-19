'use strict';

let data = [
  {
    name: 'Smartphone',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Tablet',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Wearable',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Accessory',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
