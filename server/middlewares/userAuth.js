const {generateUserToken, verifyToken} = require("../helpers/userToken");
const { User } = require("../models")
async function authentication(req, res, next){
    try{
        // console.log(req.headers);
        let userDataFromHeaders = verifyToken(req.headers.access_token)
        let userDataFromDb = await  User.findOne({where:{id: userDataFromHeaders.id}})
        if(userDataFromDb && userDataFromDb.id === userDataFromHeaders.id){
            req.userData = userDataFromHeaders
            next()
        }
        else {
            let errors = {
                statusCode :401,
                message : "Unauthenticated user"
            }
            next(errors)
        }
    }catch(err){
        next(err)
    }
}

async function adminAuthorization(req,res,next){
    try{
        let userData = req.userData
        if(userData.role === "admin"){
            next()
        }
        else{
            let errors = {
                statusCode :403,
                message : "Forbidden access"
            }
            next(errors)
        }
    }catch(err){
        next(err)
    }
}

module.exports= {authentication, adminAuthorization}