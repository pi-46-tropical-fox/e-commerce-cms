const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routes)

module.exports = app