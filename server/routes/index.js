const route = require('express').Router()
const UserController = require('../controllers/UserController');

route.get('/', (req,res) => {
    res.send('CMS E-Comerce')
})
route.post('/register',UserController.register)


module.exports = route