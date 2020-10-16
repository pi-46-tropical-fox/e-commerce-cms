'use strict'

const { Banner } = require('../models')

const authorizationBanner = async (req, res, next) => {

  console.log('HIT');
  // console.log(req.userData.role);
  // console.log('halo', req.params.banner_id);
  if (!req.params.banner_id) {
    if ('admin' == req.userData.role) {
      // console.log('MASUK');
      next ()
    }
  } else {
    console.log(req.params.banner_id);
    Banner.findByPk(+req.params.banner_id)
    .then(response => {
      if (response != null) {
        if ('admin' == req.userData.role) {
          next ()
        } else {
          throw { message : 'You have no authorize! Go back to banner page', statusCode : 403 }
        }
      } else {
        throw (err)
      }
    })
    .catch(next)
  }
}

module.exports = {
  authorizationBanner
}