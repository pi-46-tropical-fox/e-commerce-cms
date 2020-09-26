const { User } = require("../models");
const { verify_jwt_token } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
	const { access_token } = req.headers;
	try {
		if (!access_token) {
			return res.status(401).json({ message: "The user is not authenticated." });
		} else {
			const decoded_user_data = verify_jwt_token(access_token);
			const user = await User.findOne({
				where: {
					id: decoded_user_data.id,
					username: decoded_user_data.username,
					email: decoded_user_data.email
				}
			});
			if (!user) {
				return res.status(401).json({ message: "The user is not authenticated." });
			}
			req.user = user;
			return next();
		}
	} catch(err) {
		return next(err);
	}
};

module.exports = authentication;
