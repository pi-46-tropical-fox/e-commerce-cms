'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Products', [{
      name: 'Seiko SKX007',
      gender: 'Men',
      category: 'Diver',
      diameter: '43mm',
      movement: 'Automatic',
      description: 'Seiko Dive Watch with a 200m water resistance and ISO certified case. SKX007 is one of the most iconic and respected piece from the Seiko divers lineup',
      image: 'https://cdn.shopify.com/s/files/1/0022/9792/1591/files/SS221820B020_Seiko-SKX007-MT_1400x.jpg?v=1562911459',
      stock: 12,
      price: 3500000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Seiko SKX009',
      gender: 'Men',
      category: 'Diver',
      diameter: '43mm',
      movement: 'Automatic',
      description: 'Seiko Dive Watch with a 200m water resistance and ISO certified case. SKX009 is one of the most iconic and respected piece from the Seiko divers lineup',
      image: 'https://cdn.shopify.com/s/files/1/0022/9792/1591/products/W_SS221820BPS106_Seiko-SKX009-MT_2000x.jpg?v=1576118066',
      stock: 8,
      price: 3500000,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null,{})
  }
};
