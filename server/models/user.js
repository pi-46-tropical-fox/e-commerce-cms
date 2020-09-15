'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
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
        unique: {
          args: true,
          msg: "email already taken"
        },
        validate: {
          notEmpty: {
              msg: 'email required'
          },
          isEmail: {
              msg: 'please use email format'
          }
        }
    }, 
    password:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
      let salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt)
    });
  return User;
};