const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
	const { access_token } = req.headers;

	try {
		const userData = verifyToken(access_token);
		const user = await User.findByPk(userData.id);
		if (user) {
			req.userData = userData;
			next();
		} else {
			throw { name: 'notAuthenticated' };
		}
	} catch (error) {
		next(error);
	}
};

const authorizationByRoleAdmin = async (req, res, next) => {
	const { role } = req.userData;

	if (role === 'admin') {
		next();
	} else {
		next({ name: 'notAuthorizedUser' });
	}
};

module.exports = { authentication, authorizationByRoleAdmin };
