// if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"){
// }
require('dotenv').config()

const express = require("express")
var cors = require('cors')
const app = express()
const port = process.env.PORT || 3001
const router= require("./routes/index")
const errorHandler = require("./middlewares/errorHandler")

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/", router)

app.use(errorHandler)


module.exports = app