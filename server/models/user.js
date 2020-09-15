'use strict';
const { Model } = require('sequelize');
const { generatePassword } = require('../helpers/bcrypt');
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
	}
	User.init(
		{
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	User.beforeCreate((user, options) => {
		user.password = generatePassword(user.password);
		user.role = 'customer';
	});
	return User;
};
