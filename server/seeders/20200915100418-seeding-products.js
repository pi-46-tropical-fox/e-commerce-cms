'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Products', [{
      name: 'Seiko SKX007',
      gender: 'Men',
      category: 'Diver',
      diameter: '43mm',
      movement: 'Automatic',
      description: 'legendary diver watch from Seiko',
      image: 'https://cdn.shopify.com/s/files/1/0022/9792/1591/files/SS221820B020_Seiko-SKX007-MT_1400x.jpg?v=1562911459',
      stock: 12,
      price: 3500000,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null,{})
  }
};
