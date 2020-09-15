const {Products} = require ("../models")

const authorization = (req, res, next) => {
    const {id} = req.params

    Products.findByPk (id)

    .then (data => {
        if (data.role === "admin") {
            next ()
        
        } else {
            return res.status (403).json ({message : "Unauthorized Access "})
        }
    })

    .catch (err => {
        console.log (err)
        return res.status (500).json ({message : "Internal Server Error"})
    })
}

module.exports = {authorization}