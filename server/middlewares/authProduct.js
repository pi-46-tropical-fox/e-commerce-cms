const { Product } = require('../models/index')

function authProduct(req, res, next){
    Product.findByPk(req.params.id)
    .then(data =>{
        if(data !== '' || data !== 'null' || data !== undefined){
            next()
        }else{
            console.log('error');
        }
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = authProduct