const { Category } = require('../models');

class CategoryController {
	static async list(req, res, next) {
		try {
			const categories = await Category.findAll();

			return res.status(200).json(categories);
		} catch (error) {
			next(error);
		}
	}

	static async byId(req, res, next) {
		try {
			const category = await Category.findByPk(req.params.id);

			if (category) {
				return res.status(200).json(category);
			} else {
				throw { name: 'notFoundCategory' };
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = CategoryController;
