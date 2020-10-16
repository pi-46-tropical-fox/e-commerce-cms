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
        notEmpty : {
          args : true,
          msg : 'Product name must not empty!'
        }
      },
      allowNull : false
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg:  'Invalid price input'
        },
        min: {
          args: 1,
          msg:  'Invalid price input'
        },
        notEmpty: {
          args : true,
          msg : 'Invalid price input'
        }
      },
      allowNull : false
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args : true,
          msg : 'Invalid stock input'
        },
        min: {
          args: 1,
          msg:  'Invalid stock input'
        },
        notNull: {
          args : true,
          msg : 'Invalid stock input'
        },
        notEmpty: {
          args : true,
          msg : 'Invalid stock input'
        }
      },
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};