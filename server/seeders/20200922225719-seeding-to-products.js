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
        id: 1,
        name: "Sepatu Nike",
        image_url: "https://cf.shopee.co.id/file/32dfee496c33d752a1b2e21187985855" ,
        price: "2500000",
        stock: 5,
        gender: "Men",
        CategoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Tas Wanita",
        image_url: "https://images-na.ssl-images-amazon.com/images/I/71fxNoQCeSL._AC_SX466_.jpg" ,
        price: "1500000",
        stock: 5,
        gender: "Women",
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "Jeans Wanita",
        image_url: "https://www.promod.eu/gaspard-skinny-jeans--pp500095-s5-produit-493x530.jpg" ,
        price: "1000000",
        stock: 5,
        gender: "Women",
        CategoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Jacket Pria",
        image_url: "https://www.duluthtrading.com/dw/image/v2/BBNM_PRD/on/demandware.static/-/Sites-dtc-master-catalog/default/dwdc50e52d/images/large/34314_BRN.jpg?sw=313&sh=313&sm=fit" ,
        price: "750000",
        stock: 5,
        gender: "Men",
        CategoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: "Rok Wanita",
        image_url: "https://images-na.ssl-images-amazon.com/images/I/71SwsbbpDPL._AC_UX385_.jpg" ,
        price: "600000",
        stock: 5,
        gender: "Women",
        CategoryId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: "Kemeja Lengan Panjang",
        image_url: "https://contents.mediadecathlon.com/p1484240/ab565f3675dbdd7e3c486175e2c16583/p1484240.jpg" ,
        price: "500000",
        stock: 5,
        gender: "Men",
        CategoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: "Celana Pria",
        image_url: "https://ufpro.com/storage/app/media/Product%20Images/Pants/P-40%20Urban/Product%20images/Kangaroo/thumb/1920x1920.crop/p40-urban-pants-kangaroo-hero-2019-610.jpg" ,
        price: "600000",
        stock: 5,
        gender: "Men",
        CategoryId: 7,
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
    await queryInterface.bulkInsert('Products', null, {});
  }
};
