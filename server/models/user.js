'use strict';
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
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please fill the role!`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email can not be empty" },
        notEmpty: { msg: "Email can not be empty" }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 10],
          msg: `Password minimum 4 until 10 characters`
        },
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name can not be empty" },
        notEmpty: { msg: "Name can not be empty" }
      }
    }
  },{
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash

  })
  
  return User;
};