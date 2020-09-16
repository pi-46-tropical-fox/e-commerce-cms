function errorHandler(err,req,res,next){
  if(err.errors){
    if(err.errors[0].message == 'Validation notEmpty on image_url failed' || err.errors[0].message == 'Validation notEmpty on name failed'){
      res.status(400).json({message: 'Value can not be empty'})
    }else if(err.errors[0].message == 'Validation min on price failed' || err.errors[0].message == 'Validation min on stock failed'){
      res.status(400).json({message: 'Stock and price must be greater than 0'})
    }
  }else{
    res.status(err.status).json({message:err.message})
  }
}

module.exports = errorHandler