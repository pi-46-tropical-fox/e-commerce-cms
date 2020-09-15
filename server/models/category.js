'use strict';
const { Model } = require('sequelize');
const { toSlug } = require('../helpers/slugify');
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Category.hasMany(models.Product);
		}
	}
	Category.init(
		{
			name: DataTypes.STRING,
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Category',
		}
	);
	Category.beforeCreate((category, options) => {
		category.slug = toSlug(category.name);
	});
	return Category;
};
