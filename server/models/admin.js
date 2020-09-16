'use strict';
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Admin extends Model {

  }

  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty: true
      }
    },
    password: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    sequelize,
    hooks:{
      beforeCreate: (user,option)=>{
        user.password = hashPassword(user.password)
      }
    }
  })

  Admin.associate = function(models) {
    // associations can be defined here
    Admin.hasMany(models.Product)
  };
  return Admin;
};