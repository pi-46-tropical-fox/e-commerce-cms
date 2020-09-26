'use strict';
const {
  Model
} = require('sequelize');
const { generate_bcrypt_hash } = require("../helpers/bcrypt");
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username field must not be empty."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email field must not be empty."
        },
        isEmail: {
          args: true,
          msg: "Please use proper email format."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password field must not be empty."
        },
        len: {
          args: [5],
          msg: "Password must be at least 5 characters long."
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    if (!user.role || user.role.trim() === "") {
      user.role = "customer";
    }
    user.password = generate_bcrypt_hash(user.password);
  });
  return User;
};