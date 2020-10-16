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
   return await queryInterface.bulkInsert('Banners', [
    {
      title: "Coca Cola",
      status: true,
      image_url: "https://www.pngkit.com/png/detail/766-7663491_banner-coca-cola-bg.png",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title: "KFC",
      status: true,
      image_url: "https://ae01.alicdn.com/kf/HTB1wfClLXXXXXcgaXXXq6xXFXXXx/KFC-flag-KFC-banner-90-150CM-polyster-brand-flag.jpg",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title: "Aqua",
      status: true,
      image_url: "https://www.danone.com/content/dam/danone-corp/danone-com/rai/2019/pictures/impactful-projects/Aqua-manifesto-brands.jpg",
      createdAt : new Date(),
      updatedAt : new Date()
    },
    {
      title: "Bose",
      status: false,
      image_url: "https://i.pinimg.com/564x/14/eb/2c/14eb2c6016452d3899ed05841597341e.jpg",
      createdAt : new Date(),
      updatedAt : new Date()
    }
  ])
},

down: async (queryInterface, Sequelize) => {
  return await queryInterface.bulkDelete('Banners', null, {})
}
};
