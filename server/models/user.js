'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "You have to input your proper email."
        },
      }
    },
    password: {
      type: DataTypes.STRING,
    },
    RoleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(instance, options) {
        instance.password = hash(instance.password)
      }
    },
    modelName: 'User',
  });
  return User;
};