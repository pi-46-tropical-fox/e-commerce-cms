'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      History.belongsTo(models.User)
      History.belongsTo(models.Product)
    }
  };
  History.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    invoice: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};