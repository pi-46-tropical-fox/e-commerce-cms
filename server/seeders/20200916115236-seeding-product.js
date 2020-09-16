'use strict';
const fs = require('fs')

let {Product} = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))

Product.forEach(el=>{
  el['createdAt'] = new Date
  el['updatedAt'] = new Date
  delete el.id
})
// console.log(Product)

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
   await queryInterface.bulkInsert('Products', Product, {});
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
