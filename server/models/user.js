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
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name must be filled'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Wrong email format'
        },
        notEmpty: {
          msg: 'Email must be filled'
        }
      },
      unique: {
        msg: 'Email is already use. Please enter another email'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password must be filled'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'customer'
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash
    // console.log(hash)
  })

  return User;
};