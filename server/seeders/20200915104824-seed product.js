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
   return await queryInterface.bulkInsert('Products', [
    {
      name: "Apple Airpods Pro",
      image_url: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1591634795000",
      price: 3200000,
      stock: 20,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "NVIDIA RTX 3080",
      image_url: "https://assets.pikiran-rakyat.com/crop/66x0:1189x618/x/photo/2020/09/02/1102419101.jpg",
      price: 13000000,
      stock: 10,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Apple Macbook Pro 16'",
      image_url: "https://360view.hum3d.com/zoom/Apple/Apple_MacBook_Pro_16_inch_Silver_1000_0001.jpg",
      price: 38000000,
      stock: 20,
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      name: "Bose Portable Smart Speaker",
      image_url: "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/speakers/bose_portable_home_speaker/product_silo_images/bose_portable_home_speaker_black_EC_hero.psd/jcr:content/renditions/cq5dam.web.1000.1000.png",
      price: 5500000,
      stock: 20,
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ])
},

down: async (queryInterface, Sequelize) => {
  return await queryInterface.bulkDelete('Products', null, {})
}
};
