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
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name  must be filled!'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Price must be a number!'
        },
        notEmpty: {
          msg: 'Price must be filled!'
        },
        min: {
          args: [0],
          msg: 'Price must be a non-negative number!'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Stock must be a number!'
        },
        notEmpty: {
          msg: 'Stock must be filled!'
        },
        min: {
          args: [0],
          msg: 'Stock must be a non-negative number!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};