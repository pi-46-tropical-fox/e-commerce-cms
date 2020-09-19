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
      this.belongsTo(models.Category, ({foreignKey:'CategoryId'}))
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name field cannot be empty`
        }
      }
    },
    img_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Image cannot be empty`
        }
      }
    },
    color: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Color field cannot be empty`
        }
      }
    },
    capacity: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Capacity field cannot be empty`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: `Invalid number format`
        },
        isPositive(value){
          if(value <= 0){
            throw new Error(`Value must greater than 0`) 
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: `Invalid number format`
        },
        isPositive(value){
          if(value <= 0){
            throw new Error(`Value must greater than 0`) 
          }
        }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};