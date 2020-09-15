const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });

			let notValid = false;
			if (user) {
				const isValidPassword = comparePassword(password, user.password);
				if (isValidPassword) {
					const access_token = generateToken({
						id: user.id,
						email: user.email,
						role: user.role,
					});

					return res.status(200).json({
						id: user.id,
						email: user.email,
						role: user.role,
						access_token,
					});
				} else {
					notValid = true;
				}
			}

			if (notValid || user === null) {
				throw { name: 'invalidLogin' };
			}
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = UserController;
