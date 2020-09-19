'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories',
    [
      {
        name: 'Consumables',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Support',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Magical',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Armor',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Weapons',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Artifacts',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    )
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
    await queryInterface.bulkDelete('Categories', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
