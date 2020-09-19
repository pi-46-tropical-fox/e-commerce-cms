'use strict';

let data = [
  {
    name: 'Samsung Galaxy S20',
    img_url: 'https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-8-hubble-x1-could-blue-gallery-mobile-img.jpg',
    color: 'Cloud Blue',
    capacity: '128GB',
    price: 14499000,
    stock: 10,
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Samsung Galaxy S20',
    img_url: 'https://images.samsung.com/fr/smartphones/galaxy-s20/buy/carousel/mobile/1-9-hubble-x1-cosmic-gray-gallery-img.jpg',
    color: 'Cosmic Gray',
    capacity: '128GB',
    price: 14499000,
    stock: 10,
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Samsung Galaxy S20',
    img_url: 'https://images.samsung.com/id/smartphones/galaxy-s20/buy/1-7-hubble-x1-cloud-pink-gallery-mobile-img.jpg',
    color: 'Cloud Pink',
    capacity: '128GB',
    price: 14499000,
    stock: 10,
    CategoryId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Galaxy Watch Active2 (40mm) - Stainless Steel Gold',
    img_url: 'https://images.samsung.com/is/image/samsung/id-galaxy-watch-active-r830-sm-r830nsdaxse-frontgold-183419831?$PD_GALLERY_L_SHOP_JPG$',
    color: 'Pink',
    capacity: '4GB',
    price: 5299000,
    stock: 5,
    CategoryId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Samsung Galaxy Tab S6',
    img_url: 'https://images.samsung.com/is/image/samsung/id-galaxy-tab-s6-t865-sm-t865nzaaxid-frontgray-178517793?$PD_GALLERY_L_JPG$',
    color: 'Gray',
    capacity: '128GB',
    price: 12999000,
    stock: 8,
    CategoryId: 2,
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
