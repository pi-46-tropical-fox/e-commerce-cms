const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const generateToken = userData => {
	return jwt.sign(userData, secret);
};

const verifyToken = access_token => {
	try {
		return jwt.verify(access_token, secret);
	} catch (error) {
		throw { name: 'notAuthenticated' };
	}
};

module.exports = { generateToken, verifyToken };
