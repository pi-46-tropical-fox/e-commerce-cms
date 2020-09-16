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
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name field must not be empty."
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price field must not be empty."
        },
        min: {
          args: [0],
          msg: "Price value can not be negative."
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock field must not be empty."
        },
        min: {
          args: [0],
          msg: "Stock value can not be negative."
        }
      }
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};