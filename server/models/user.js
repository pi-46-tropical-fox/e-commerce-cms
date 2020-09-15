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
    email: {
      type: DataTypes.STRING,
      unique:{
        args: true,
        msg: 'email has been taken, please change'
      },
      validate: {
        notEmpty: {
          msg: 'Email is required!'
        },
        isEmail: {
          msg: 'Email must use email format!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required!'
        },
        len: {
          args: [6, 100],
          msg: 'password min 6 characters'
        }
      }
    },
    role: DataTypes.STRING || 'Admin'
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync(9)
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  });
  return User;
};