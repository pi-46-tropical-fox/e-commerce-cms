'use strict';
const {
  Model
} = require('sequelize');
const {createHash} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'please insert email'
        },
        isEmail:{
          args:true,
          msg: ' please insert correct email'
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: [6],
          msg:'please insert password min. 6 charachters'
        },
      }
    },
    role:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'please insert role'
        },
      }
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate : ((user,option) =>{
        user.password = createHash(user.password)
      }),
    },
    modelName: 'User',
  });
  return User;
};