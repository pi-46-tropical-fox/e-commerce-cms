const { verifyToken } = require("../helpers/jwt");
const { User, Product } = require("../models");

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const userData = verifyToken(access_token);
    let user = await User.findOne({
      where: {
        email: userData.email,
      },
    });
    if (user) {
      req.userData = userData;
      next();
    } else {
      return res.status(401).json({ message: `Doesnt recognize user..` });
    }
  } catch (error) {
    return res.status(401).json({ message: `Doesnt recognize user..` });
  }
};

const authorization = (req, res, next) => {
  User.findByPk(req.userData.id)
  .then(user => {
    if (user.role === 'Admin') {
      next()
    } else {
      return res.status(403).json({message: `You are not an admin!`})
    }
  })
  .catch(err => {
    return res.status(500).json({message: `Internal Server Error`})
  })
};

module.exports = { authentication, authorization };
