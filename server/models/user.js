'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/password')

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
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name : DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks : {
      async beforeCreate(data){
        data.password = hashPassword(data.password)
        return data
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};