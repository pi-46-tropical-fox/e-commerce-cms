const { verifyToken, generateToken } = require('../helpers/jwt')
const { Product, User } = require('../models')

const authentication  = async (req,res,next) =>{
    const { access_token } = req.headers
    try {
        const { email, id, role } = verifyToken(access_token)
        let user = await User.findAll({where:{email}})
        if(user){
            req.userData = { email, id, role }
            next()
            
        }else{
            return res.status(403).json({msg : 'User Not Authenticated'})
        }
    } catch (err) {
        console.log(err.name,'Not Authenticated (catch)')
        return res.status(403).json({msg : 'User Not Authenticated'})
    }
}

const authorization = (req,res,next) =>{
    User.findByPk(req.userData.id)
    .then(data =>{
        if(data && data.role === 'admin'){
            console.log('succes')
            next()
        }else{
            return res.status(403).json({msg:'Forbidden Access'})
            // throw{msg:'Forbidden Access', statusCode: 401}
        }
    })
    .catch(err =>{
        return res.status(400).json({msg:'Bad request'})
        // return next(err)
    })
}


module.exports = { authentication, authorization }
