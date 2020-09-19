require(`dotenv`).config()
const express = require(`express`)
const cors = require(`cors`)

const errHandler = require(`./helpers/errHandler`)
const routes = require(`./routes`)

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(routes)
app.use(errHandler)

module.exports = app

app.listen(PORT, _=> { console.log(`Listening on PORT ${PORT}`) })