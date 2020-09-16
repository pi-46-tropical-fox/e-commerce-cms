const {User,Product} = require('../models')
const {verify} = require('../helper/jwt')

const authentication = async (req,res,next) =>{
    const { access_token } = req.headers;
    try {
      const user = verify(access_token);
      let data = await User.findOne({
        where: {
          email: user.email,
        },
      });
      if (data) {
        req.user = user;
        next();
      } else {
        throw ({ message: `Doesnt recognize user`,statusCode:401 });
      }
    } catch (err) {
      next(err)
    }
}

const authorization = (req,res,next)=>{
    User.findByPk(req.user.id)
  .then(userData => {
    if (userData.role === 'admin') {
      next()
    } else {
      throw ({message: `You are not an admin!` ,statusCode:403})
    }
  })
  .catch(err => {
    next(err)
  })
}



module.exports = {authentication ,authorization}