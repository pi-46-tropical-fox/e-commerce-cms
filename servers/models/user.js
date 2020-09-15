'use strict';
const {
  Model
} = require('sequelize');
const {hashing} = require(`../helpers/bcrypt`)

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
      validate: {
        notEmpty: {
          args: true,
          msg: "Email can not be empty"
        },
        isEmail: {
          args: true,
          msg: "Email format is wrong. E.g. foo@bar.com"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 9],
          msg: "Minimum password is three and maximun is nine"
        },
        notEmpty: {
          args: true,
          msg: "Password can not be empty"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, opt) => {
    user.role = user.role || "customer"
    user.password = hashing(user.password)
  })
  return User;
};