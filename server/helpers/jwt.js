const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const generate_jwt_token = obj => {
	const { id, username, email } = obj;
	const payload = { id, username, email };
	const access_token = jwt.sign(payload, secret);
	return access_token;
};

const verify_jwt_token = access_token => {
	const decoded_data = jwt.verify(access_token, secret);
	return decoded_data;
};

module.exports = { generate_jwt_token, verify_jwt_token };