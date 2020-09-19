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
    await queryInterface.bulkInsert('Products', [
      {
       name: 'Product A',
       image_url: "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg",
       stock: 5,
       price: 10000,
       category: 'fashion',
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        name: 'Product B',
        image_url: "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
        stock: 2,
        price: 20000,
        category: 'fashion',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Product C',
        image_url: "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg",
        stock: 4,
        price: 15000,
        category: 'electronic',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Product D',
        image_url: "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg",
        stock: 1,
        price: 13000,
        category: 'electronic',
        createdAt: new Date(),
        updatedAt: new Date()
       },
       {
        name: 'Product E',
        image_url: "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg",
        stock: 8,
        price: 12000,
        category: 'fashion',
        createdAt: new Date(),
        updatedAt: new Date()
       }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
