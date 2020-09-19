const bcrypt = require('bcryptjs');

function hashPassword(password){
  var salt = bcrypt.genSaltSync(8);
  var hash = bcrypt.hashSync(password, salt);
  return hash
}

function checkPassword(input,hash){
  return bcrypt.compareSync(input, hash);
}

module.exports = {hashPassword,checkPassword}