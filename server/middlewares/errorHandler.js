'use strict'

function errorHandler (err, req, res, next) {

  let errors = []
  let statusCode = 500
  console.log(err.name, "<<<<<<<<err.name");
  // console.log(err, "err");
  console.log(err.message, "err.messg");

  if (err.name === 'SequelizeValidationError') {
    err.errors.forEach(error => {
      if (error.message != errors[0] && error.message != errors[1] ) {
        errors.push(error.message)
      }
    })
    statusCode = 400
  }
  if (err.name === 'JsonWebTokenError') {
    errors.push('Sorry you are not authenticated, please login!')
    statusCode = 401
  }
  else {
      if (!errors[0]) {
        errors.push(err.message)
        statusCode = err.statusCode || 500
      }
    
  }
  return res.status(statusCode).json({ errors })
}


module.exports = errorHandler