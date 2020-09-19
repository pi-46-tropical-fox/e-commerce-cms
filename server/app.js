const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const errHandler =require('./middlewares/errHandler')
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)
app.use(errHandler)

app.listen(port, ()=>{
    console.log(`listen on ${port}`)
})



module.exports = app

