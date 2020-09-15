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
      Product.belongsTo(models.Category, {foreignKey: 'category'})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          args: true,
          msg: 'Invalid image url'
        },
        notEmpty: {
          args: true,
          msg: 'Image url cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Price must be a number'
        },
        min: {
          args: [0],
          msg: 'Price must be a positive number'
        },
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Stock must be a number'
        },
        min: {
          args: [0],
          msg: 'Stock must be a positive number'
        }
      }
    },
    category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {
      beforeCreate: (product, options) => {
        if (!product.stock) product.stock = 0
      }
    }
  });
  return Product;
};