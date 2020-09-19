if(process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const app = require('../app.js')
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server listen at ${port}`)
})