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
     title: "https://static.vecteezy.com/system/resources/previews/000/662/992/original/abstract-fashion-banner-design-vector.jpg",
     status: 'inactive',
     category: 'fashion',
     createdAt: new Date(),
     updatedAt: new Date()
    },
    {
      title: "https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?size=626&ext=jpg",
      status: 'inactive',
      category: 'fashion',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      title: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdUD08RM4SJ75njLzCM4BrBZUVERiSizv6vw&usqp=CAU",
      status: 'inactive',
      category: 'skincare',
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
    await queryInterface.bulkDelete('Banners', null, {});
  }
};
