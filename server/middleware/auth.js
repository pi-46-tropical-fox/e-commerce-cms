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
        return res.status(401).json({ message: `Doesnt recognize user` });
      }
    } catch (error) {
      return res.status(401).json(error);
    }
}

const authorization = (req,res,next)=>{
    User.findByPk(req.user.id)
  .then(userData => {
    if (userData.role === 'admin') {
      next()
    } else {
      return res.status(403).json({message: `You are not an admin!`})
    }
  })
  .catch(err => {
    return res.status(500).json({message: `Internal Server Error`})
  })
}



module.exports = {authentication ,authorization}