var bcrypt = require("bcryptjs");

const hashed = (pass) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash
};

const compare = (inputpass,pass)=>{
    const isValid = bcrypt.compareSync(inputpass,pass)
    return isValid
}

module.exports = {hashed,compare}
