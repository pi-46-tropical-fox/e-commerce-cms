'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category)
    }
  };
  Product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric:{
          args: true,
          msg: "Only numbers allowed for price"
        },
        min: {
          args: [0],
          msg: "Price's value can't be a negative number"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric:{
          args: true,
          msg: "Only numbers allowed for stock"
        },
        min: {
          args: [0],          
          msg: "Stock's value can't be a negative number"
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};