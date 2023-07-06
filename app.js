const express = require("express");
require("dotenv").config();
require("./backend/db");
const userRoute = require("./backend/routes/userRoute");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const productRoute = require("./backend/routes/productRoute");
const commonRoute = require("./backend/routes/commonRoute");
const topicRoute = require("./backend/routes/topicRoute");
const categoryRoute = require("./backend/routes/categoryRoute");
const paymentRoute = require("./backend/routes/paymentRoute");
const orderRoute = require("./backend/routes/orderRoute");
const cors = require('cors');
const path = require('path')


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, './frontend/build')))

const errorMiddleware = require("./backend/middleware/error");
app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", commonRoute);
app.use("/api/v1", topicRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1", orderRoute);

app.get("/api/v1/getkey", (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})


// app.use('*', function(req,res) {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.js'))
// })
// Middleware for Error

app.use(errorMiddleware);
module.exports = app;

app.listen(8000, () => {
    console.log("the server is listening on port 8000");
}); 