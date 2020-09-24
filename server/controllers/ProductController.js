const { Product, Category } = require('../models');

class ProductController {
	static async list(req, res, next) {
		try {
			const products = await Product.findAll({
				include: [Category],
			});

			return res.status(200).json(products);
		} catch (error) {
			next(error);
		}
	}

	static async byId(req, res, next) {
		try {
			const product = await Product.findOne({
				where: {
					id: req.params.id,
				},
				include: ['Category'],
			});

			if (product) {
				return res.status(200).json(product);
			} else {
				throw { name: 'notFoundProduct' };
			}
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		const { name, image_url, price, stock, CategoryId } = req.body;
		try {
			const product = await Product.create({ name, image_url, price, stock, CategoryId });

			return res.status(201).json(product);
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
		const { name, image_url, price, stock, CategoryId } = req.body;
		try {
			const product = await Product.update(
				{ name, image_url, price, stock, CategoryId },
				{
					where: {
						id: req.params.id,
					},
					returning: true,
				}
			);

			if (product[0]) {
				return res.status(200).json(product[1][0]);
			} else {
				throw { name: 'notFoundProduct' };
			}
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const productToDelete = await Product.findOne({ where: { id: req.params.id } });
			const product = await Product.destroy({
				where: { id: req.params.id },
			});

			if (productToDelete && product) {
				return res.status(200).json(productToDelete);
			} else {
				throw { name: 'notFoundProduct' };
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = ProductController;
