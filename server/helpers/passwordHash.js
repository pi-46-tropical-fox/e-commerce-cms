const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function passwordHash(pw){
    let hash = bcrypt.hashSync(pw, salt);
    return hash
}

module.exports = passwordHash