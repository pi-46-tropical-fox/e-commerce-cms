const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(routes);
app.use(errorHandler);

module.exports = app;
