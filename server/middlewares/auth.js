const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const userData = verifyToken(access_token);
    console.log(userData, "<<<< this is userData");

    let user = await User.findOne({
      where: {
        email: userData.email
      }
    });
    if (user) {
      req.userData = userData;
      next();
    } else {
      throw { message: "User is not authenticated", statusCode: 401 };
    }
  } catch(err) {
    console.log(err, "<<<< error in authentication");
    return next(err);
  }
}

const authorization = (req, res, next) => {
  const { access_token } = req.headers;
  const userData = verifyToken(access_token);
  console.log(userData, "<<<< this is userData");

  if (userData.role === "admin") {
    next();
  } else {
    throw { message: "Unauthorized Access", statusCode: 403 };
  }
}

module.exports = { authentication, authorization };