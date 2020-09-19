'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 50],
          msg: "Name minimum is three and maximun fifty"
        },
        notEmpty: {
          args: true,
          msg: "Name can not be empty"
        }
      }
    },
    status: DataTypes.BOOLEAN,
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "image_url can not be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });

  Banner.beforeCreate((banner, opt) => {
    banner.status = false
  })
  return Banner;
};