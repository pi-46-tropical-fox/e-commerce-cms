const {Product} = require ("../models")

const authorization = (req, res, next) => {

    try {
        if (req.UserData.role === "admin") {
            next ()
        
        } else {
            throw {message : "Unauthorized Access ", errorStatus: 403}
        }
    }

    catch (err) {
        return res.status (500).json ({message : "Internal Server Error"})
    }
        
    
}

module.exports = {authorization}