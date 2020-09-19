const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const app = express();
const router = require('./routes')

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cors());

app.use(router)

app.listen(PORT,()=>{
  console.log(`Listening to port ${PORT}`)
})