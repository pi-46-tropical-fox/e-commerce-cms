const { User } = require("../models");
const { verify_jwt_token } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
	const { access_token } = req.headers;
	try {
		const decoded_user_dadta = verify_jwt_token(access_token);
		const user = await User.findOne({
			where: {
				id: decoded_user_dadta.id,
				username: decoded_user_dadta.username,
				email: decoded_user_dadta.email
			}
		});
		if (!user) {
			return res.status(401).json({ message: "The user is not authenticated." });
		}
		req.user = user;
		return next();
	} catch(err) {
		return next(err);
	}
};

module.exports = authentication;
