if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
}
const cors = require("cors")
const express = require("express")
const app = express()
const routes = require('./routes')
const ErrHandler = require('./middleware/ErrHandler')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(routes)
app.use(ErrHandler)

module.exports = app