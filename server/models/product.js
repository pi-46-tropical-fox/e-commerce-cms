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
          msg: 'Name Must Be Filled'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Image Must Be Filled'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:{
          args: [1],
          msg: 'Price Must Be More Than 0'
        },
        isNumeric:{
          msg: 'Please Input Number'
        },
        notNull:{
          msg: 'Price Must Be Filled'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min:{
          args: [1],
          msg: 'Stock Must Be More Than 0'
        },
        isNumeric:{
          msg: 'Please Input Number'
        },
        notNull:{
          msg: 'Stock Must Be Filled'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Category Must Be Filled'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};