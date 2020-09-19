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
      type:DataTypes.STRING,
      unique:true,
      notNull:true,
      validate:{
        isEmail:{
          args:true,
          msg:`Wrong input`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      notNull:true,
      validate:{
        len:{
          args:[4,12],
          msg:`password min 4 characters and max 12 characters`
        },
        notEmpty:{
          args:true,
          msg:`password can't be empty`
        }
      }
    },
    role:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:`role can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user,options)=>{
    // user.role = 'customer'

    let salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(user.password,salt)
  })
  return User;
};