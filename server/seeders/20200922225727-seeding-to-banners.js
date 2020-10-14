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
  await queryInterface.bulkInsert('Banners', [
      {
        id: 1,
        title: "Online Payment",
        status: "Activ",
        image_url: "https://thumbs.dreamstime.com/z/online-payment-concept-banner-horizontal-shopping-web-design-internet-isometric-template-smartphone-integrated-atm-cart-148296592.jpg" ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Fashion Bags",
        status: "Activ",
        image_url: "https://fscomps.fotosearch.com/compc/CSP/CSP323/fashion-bags-banner-horizontal-concept-clip-art__k57625821.jpg" ,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: "Happy Thanksgiving",
        status: "Activ",
        image_url: "https://fscomps.fotosearch.com/compc/CSP/CSP413/happy-thanksgiving-banner-horizontal-clipart__k50024651.jpg" ,
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
    await queryInterface.bulkDelete('Banners', null, {})
  }
};
