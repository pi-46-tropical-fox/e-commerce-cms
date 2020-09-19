const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const app = express();
const router = require('./routes')

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());

app.use(router);

module.exports = app