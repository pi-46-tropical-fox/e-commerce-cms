require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

module.exports = app;
