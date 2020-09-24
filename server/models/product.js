'use strict';
const { Model } = require('sequelize');
const { toSlug } = require('../helpers/slugify');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsTo(models.Category);
		}
	}
	Product.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Name cannot empty',
					},
					notNull: {
						args: true,
						msg: 'Name cannot null',
					},
				},
			},
			image_url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Image url cannot empty',
					},
					notNull: {
						args: true,
						msg: 'Image url cannot null',
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Price cannot empty',
					},
					notNull: {
						args: true,
						msg: 'Price cannot null',
					},
					isInteger(val) {
						if (val < 0 || typeof val !== 'number') {
							throw new Error('Price must be positive numbers with no leading zeroes');
						}
					},
				},
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Stock cannot empty',
					},
					notNull: {
						args: true,
						msg: 'Stock cannot null',
					},
					isInteger(val) {
						if (val < 0 || typeof val !== 'number') {
							throw new Error('Stock must be positive numbers with no leading zeroes');
						}
					},
				},
			},
			CategoryId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						args: true,
						msg: 'Category id cannot empty',
					},
					notNull: {
						args: true,
						msg: 'Category id cannot null',
					},
				},
			},
			slug: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Product',
		}
	);
	Product.beforeCreate((product, options) => {
		product.slug = toSlug(product.name);
	});
	return Product;
};
