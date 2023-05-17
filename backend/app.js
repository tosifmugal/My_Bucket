const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const errorMiddleware = require("./middleware/error");
// const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const app = express();
// Config
dotenv.config({ path: "config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//after run build
app.use(express.static(path.join(__dirname, "../frentend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frentend/build/index.html"));
});
// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
