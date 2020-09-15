'use strict';

let data = [
  {
    name: 'Samsung Galaxy S20+',
    img_url: 'https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-8-hubble-x1-could-blue-gallery-mobile-img.jpg',
    color: 'Cloud Blue',
    capacity: '128GB',
    price: 14499000,
    stock: 10,
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', data)
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
    await queryInterface.bulkDelete('Products', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
