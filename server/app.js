require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const errHandler = require("./middlewares/errHandler");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const bannerRouter = require("./routes/bannerRouter");

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// User Routes
app.use(userRouter);

// Product Routes
app.use("/products", productRouter);

// Banner Routes
app.use("/banners", bannerRouter);

// Error Handler
app.use(errHandler);

module.exports = app;