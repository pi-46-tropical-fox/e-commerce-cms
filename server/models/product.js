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
      allowNull:false,
      validate: {
        notNull: {
          args: true,
          msg: 'name is required'
        },
        len: {
          args: 1,
          msg: 'Name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          args: true,
          msg: 'image is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull: {
          args: true,
          msg: 'price is required'
        },
        min: {
          args: [0],
          msg: 'Price tidak boleh minus'
        },
        isNumeric: {
          args: true,
          msg: 'Price harus number'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull: {
          args: true,
          msg: 'stock is required'
        },
        min: {
          args: [0],
          msg: 'Stock tidak boleh minus'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};