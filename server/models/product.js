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
      Product.hasMany(models.Cart)
      Product.belongsToMany(models.User,{through: models.Cart})
      Product.hasMany(models.Wishlist)
      Product.belongsToMany(models.User,{through: models.Wishlist})
      Product.hasMany(models.History)
      Product.belongsToMany(models.User,{through: models.History})
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg : "Name cannot empty"
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric : {
          args: true,
          msg : "Invalid input value price"
        },
        min : {
          args: 1,
          msg : "Price cannot less then 1"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric : {
          args: true,
          msg : "Invalid input value stock"
        },
        min : {
          args: 1,
          msg : "Stock cannot less then 1"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args: true,
          msg : "Gender cannot empty"
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