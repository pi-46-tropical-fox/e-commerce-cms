// if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
// }
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
//const routes = require('./routes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors())
//app.use(routes)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Makan nasi yang ke ${PORT} hari`);
})

module.exports = app