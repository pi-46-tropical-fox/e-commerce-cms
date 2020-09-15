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
          msg: 'name required'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty: {
          msg: 'price required'
        },
        min: {
          args: [0],
          msg: 'must be a non-negative number'
        },
        isInt: {
          msg: 'must be a number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty: {
          msg: 'price required'
        },
        min: {
          args: [0],
          msg: 'must be a non-negative number'
        },
        isInt: {
          msg: 'must be a number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};