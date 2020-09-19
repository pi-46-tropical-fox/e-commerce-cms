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
      validate:{
        notEmpty:{
          args: true,
          msg:'please insert name'
        },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'please insert image url'
        },
        isUrl:{
          args:true,
          msg:'please insert url'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args: true,
          msg:'please insert price'
        },
        isNumeric:{
          args:true,
          msg:'please insert number'
        },
        min:{
          args:1,
          msg:'cannot insert price less than 1'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          args: true,
          msg:'please insert stock'
        },
        isNumeric:{
          args:true,
          msg:'please insert number'
        },
        min:{
          args:1,
          msg:'cannot insert stock less than 1'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'please insert category'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};