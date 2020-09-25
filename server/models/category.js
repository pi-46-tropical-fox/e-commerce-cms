'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      })
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "You have to input the category name!"
        }
      }
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};