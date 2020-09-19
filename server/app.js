if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    require('dotenv').config()
}
const cors = require("cors")
const express = require("express")
const app = express()
const routes = require('./routes')
const ErrHandler = require('./middleware/ErrHandler')
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(routes)
app.use(ErrHandler)
app.get("/", (req, res) => {
    res.send({messsage: "MASUK HEROKU"})
})

app.listen(PORT, () => {
    console.log(`App is running on ${process.env.NODE_ENV} on port: ${PORT}`)
})
module.exports = app