const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function generateToken(user) {
  const payload = {id: user.id, email: user.email}
  const access_token = jwt.sign(payload, secret)

  return access_token;
}

function verifyToken(token) {
  const verified = jwt.verify(token, secret)
  
  return verified
}

module.exports= { generateToken, verifyToken }