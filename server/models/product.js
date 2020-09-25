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
      Product.hasMany(models.CartProduct, {
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
        notNull: {
          msg: "You must specify the product name!"
        },
        notEmpty: {
          msg: "You must specify the product name!"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "You must specify the product price!"
        },
        notEmpty: {
          msg: "You must specify the product price!"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "You must specify the product price!"
        },
        notEmpty: {
          msg: "You must specify the product price!"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You must specify the category!"
        }
      },
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
      validate: {
        priceMustBePositive() {
          if (this.price < 0) throw new Error(`The product price must be a positive number!`)
        },
        stockMustBePositive() {
          if (this.stock < 0) throw new Error(`The product stock must be a positive number!`)
        },
      },
    hooks: {
      beforeValidate(instance) {
        instance.stock = !!instance.stock ? Number(instance.stock) : instance.stock
        instance.price = !!instance.price ? instance.price * 100 : instance.price
      }
    },
    modelName: 'Product',
  });
  return Product;
};