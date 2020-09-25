const { Product } = require("../models");

class ProductController {
	static async create (req, res) {
		const { name, image_url, price, stock, category } = req.body;
		try {
			const new_product = await Product.create({ name, image_url, price, stock, category });
			return res.status(201).json(new_product);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async read (req, res) {
		try {
			const all_products = await Product.findAll();
			return res.status(200).json(all_products);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async update (req, res) {
		const ProductId = +req.params.ProductId;
		const { name, image_url, price, stock, category } = req.body;
		try {
			const updated_product = await Product.update({ name, image_url, price, stock, category }, {
				where: {
					id: ProductId
				},
				returning: true
			});
			return res.status(200).json(updated_product[1][0]);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async delete (req, res) {
		const ProductId = +req.params.ProductId;
		try {
			const deleted_product = await Product.findByPk(ProductId);
			const result = await Product.destroy({
				where: {
					id: ProductId
				}
			});
			return res.status(200).json(deleted_product);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = ProductController;
