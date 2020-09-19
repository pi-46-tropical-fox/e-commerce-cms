'use strict';

const passwordHash = require("../helpers/passwordHash")

const {
  Model
} = require('sequelize');
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
      type : DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          args: true,
          msg: "Email required"

        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          args: true,
          msg: "Password required"

        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+=]).{8,}$/,
          msg: 'Password must contain at least 8 characters including at least a uppercase, a lowercase and a number.'
        },

      }
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: function(userData){
        userData.password = passwordHash(userData.password)
      }
    }
  });
  return User;
};