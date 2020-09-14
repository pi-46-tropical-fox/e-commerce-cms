const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function generateToken(user) {
  //console.log(user, '<< ini user di jwt');
  const payload = {id: user.id, email: user.email}
  const access_token = jwt.sign(payload, secret)

  return access_token;
}

function verifyToken(token) {
  //console.log(token, '<<<ini token di jwt');
  const verified = jwt.verify(token, secret)
  
  return verified
}

module.exports= { generateToken, verifyToken }