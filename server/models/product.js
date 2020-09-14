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
          args: true,
          msg: "Name cannot be left blank!"
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image url cannot be left blank!"
        },
        isUrl: {
          args: true,
          msg: "Please insert a valid url!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Price must be greater than or equals to 0"
        },
        notEmpty: {
          args: true,
          msg: "Price cannot be left blank!"
        },
        isInt: {
          args: true,
          msg: "Price must be in numeric format!"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [0],
          msg: "Stock must be greater than or equals to 0"
        },
        notEmpty: {
          args: true,
          msg: "Stock cannot be left blank!"
        },
        isInt: {
          args: true,
          msg: "Stock must be in numeric format!"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Category cannot be left blank!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};