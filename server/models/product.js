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
      Product.belongsTo(models.Category)
      Product.hasMany(models.ProductImage, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You have to fill out the product name."
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You have to specify the product price, and it's not negative."
        },
        isNotNegative(value) {
          if(value < 0) return new Error(`Oh no, don't put negative numbers inside product price!`)
        },
        isNumeric: {
          msg: "Product stock: Numbers, please."
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You should specify the product stock, and it's not negative."
        },
        isNumeric: {
          msg: "Product stock: Numbers, please."
        },
        isNotNegative(value) {
          if(value < 0) return new Error(`Oh no, don't put negative numbers inside product stock!`)
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You should specify the category!"
        }
      },
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeValidate(instance){
        instance.stock = Number(instance.stock)
        instance.price = instance.price * 100
      }
    },
    modelName: 'Product',
  });
  return Product;
};