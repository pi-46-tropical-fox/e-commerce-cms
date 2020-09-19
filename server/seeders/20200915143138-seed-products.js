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
   await queryInterface.bulkInsert(
     "Products",
     [
       {
         name: "Kemeja SMA",
         image_url: "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/7/21/1943588/1943588_545a426f-7652-4379-9c81-53aa23aace0c_720_735.jpg",
         price: 68000,
         stock: 10,
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        name: "Celana Abu-Abu SMA",
        image_url: "https://id-live-01.slatic.net/p/36bc53ee7bf7324a2636fbd62af23661.jpg",
        price: 45000,
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sepatu Capung",
        image_url: "https://s.blanja.com/picspace/485/225765/700.700_d7ccc198c98b4fb19ce1c97b4ee8e860.jpg",
        price: 90000,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ],
     {}
   )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {})
  }
};
