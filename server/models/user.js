'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers/bcrpyt');
const role = require('./role');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {foreignKey: 'role'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid Email'
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 12],
          msg: 'Password length must be 5-12 characters'
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        }
      }
    },
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashing(user.password)
        if (!user.role) user.role = 2
      }
    }
  });
  return User;
};