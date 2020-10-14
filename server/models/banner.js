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
        notEmpty : {
          args: true,
          msg: " Title cannot empty"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: [/Activ/],
          msg: "Please input with Activ or Not Activ"
        }
      }  

    },
    image_url: {
      type: DataTypes.STRING, 
      validate: {
        notEmpty : {
          args: true,
          msg: "Image url cannot empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};