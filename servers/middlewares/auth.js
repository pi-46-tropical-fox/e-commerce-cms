const {verify_token} = require(`../helpers/jwt`)
const {Product, User} = require(`../models`)

module.exports = {
    authentication: async (req, res, next) => {
        try{
            const userData = verify_token(req.headers.access_token)
            let user = await User.findOne({where: {email: userData.email}})
            if(user){
                req.userData = userData
                next()
            } else {
                throw { message: "User not authenticate", statusCode: 401}
            }
        }catch(err){
            return next(err)
        }
    },

    authorization: async (req, res, next) => {
        const id = req.params.id

        try{
            const product = await Product.findByPk(id)
            if(!product){
                throw { message: "Product not found", statusCode: 404 }
            }
            return next()
        }catch(err){
            return next(err)
        }
    },

    isAdmin: async (req, res, next) => {
        if(req.userData.role !== 'admin'){
            return next({ message: "Forbidden Access, only admin can manage the product", statusCode: 403})
        }
        return next()
    }

}


