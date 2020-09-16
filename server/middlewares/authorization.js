const { User } = require("../models");

const authorization = async (req, res, next) => {
	const UserId = req.user.id;
	try {
		const user = await User.findByPk(UserId);
		if (user && user.role === "admin") {
			return next();
		}
		return res.status(403).json({ message: "The user is not authorized." });
	} catch (err) {
		return next(err);
	}
}

module.exports = authorization;
