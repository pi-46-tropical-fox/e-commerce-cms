'use strict'

const { Product } = require('../models')

const authorizationProduct = async (req, res, next) => {

  // console.log('HIT');
  // console.log(req.userData.role);
  // console.log('halo', req.params.product_id);
  if (!req.params.product_id) {
    if ('admin' == req.userData.role) {
      // console.log('MASUK');
      next ()
    }
  } else {
    console.log(req.params.product_id);
    Product.findByPk(+req.params.product_id)
    .then(response => {
      if (response != null) {
        if ('admin' == req.userData.role) {
          next ()
        } else {
          throw { message : 'You have no authorize! Go back to books page', statusCode : 403 }
        }
      } else {
        throw (err)
      }
    })
    .catch(next)
  }
}

module.exports = {
  authorizationProduct
}