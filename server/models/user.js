'use strict';
const {
  Model
} = require('sequelize');
const {createHash} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart)
      User.belongsToMany(models.Product,{through: models.Cart})
      User.hasMany(models.Wishlist)
      User.belongsToMany(models.Product,{through: models.Wishlist})
      User.hasMany(models.History)
      User.belongsToMany(models.Product,{through: models.History})

    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name cannot empty"  
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "Password min 6 characters"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook("beforeCreate", (user, options) => {
    const hash = createHash(user.password)
    user.password = hash
    if(!user.role){
      user.role = 'customer'
    }
  })
  return User;
};