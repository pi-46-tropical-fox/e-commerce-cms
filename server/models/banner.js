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
        notEmpty: {
          args: true,
          msg: "Title cannot be left blank!"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status cannot be left blank!"
        },
        isBoolean(value) {
          if (typeof value !== "boolean") {
            throw new Error("Status must be boolean!");
          }
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
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  Banner.beforeCreate((banner, options) => {
    if (!banner.status) {
      banner.status = false;
    }
  });
  return Banner;
};