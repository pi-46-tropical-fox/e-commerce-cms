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
        len: {
          args: [4, 50],
          msg: "Name minimum is three and maximun fifty"
        },
        notEmpty: {
          args: true,
          msg: "Name can not be empty"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "image_url can not be empty"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "price can not be empty"
        },
        isNumeric: {
          args: true,
          msg: "Price must only contain number"
        },
        min(value){
          if(+value < 2000){
            throw "Price must be minimum 2000"
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock can not be empty"
        },
        isNumeric: {
          args: true,
          msg: "Stock must only contain number"
        },
        min(value){
          if(+value < 0){
            throw "Stock must be minimum 0"
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};