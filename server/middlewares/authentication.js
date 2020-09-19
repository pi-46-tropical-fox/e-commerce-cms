const AuthHelper = require('../helper/jwt')

function  authentication(req, res, next){

    try{
        const access_token = req.headers.access_token
        const user = AuthHelper.verifyToken(access_token)
        req.user = user
    }
    catch(err){
        console.log(err);        
    }
}

module.exports = authentication
