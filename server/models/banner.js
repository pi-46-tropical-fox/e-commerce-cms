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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Banner name cannot be null nor empty!"
        },
        notEmpty: {
          msg: "Banner name cannot be null nor empty!"
        }
      }
    },
    banner_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Banner title cannot be null nor empty!"
        },
        notEmpty: {
          msg: "Banner title cannot be null nor empty!"
        }
      }
    },
    banner_description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};