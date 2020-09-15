const bcrypt = require('bcryptjs');

const generatePassword = password => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (userPassword, databasePassword) => {
	return bcrypt.compareSync(userPassword, databasePassword);
};

module.exports = { generatePassword, comparePassword };
