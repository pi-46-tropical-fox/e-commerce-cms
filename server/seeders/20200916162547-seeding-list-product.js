'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
         name: 'Skirt Cantik',
         image_url: 'https://images-na.ssl-images-amazon.com/images/I/71ughJzu-PL.__AC_SX342_QL70_ML2_.jpg',
         price: 50000,
         stock: 10,
         createdAt: new Date(),
         updatedAt: new Date()
      },
      {
        name: 'T-shirt Jozz',
        image_url: 'https://imgprd19.hobbylobby.com/9/5f/26/95f264323ae49e65b2a53a909fcd7d9ee659f3c7/350Wx350H-422519-0320.jpg',
        price: 70000,
        stock: 11,
        createdAt: new Date(),
        updatedAt: new Date()
     }
      ], {});
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
