var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var mongoose = require("mongoose");

// Environment Vars from Dotenv
const dotenv = require("dotenv");
dotenv.config();

var app = express();

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to db
const connect = () => {
  mongoose.connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@127.0.0.1:27017/habits`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};
connect();

// handle errors , disconnections and notify of connection
mongoose.connection.on("error", console.error);
mongoose.connection.on("disconnected", connect);
mongoose.connection.once("open", (_) => {
  console.log("connected");
});

// router setup
app.use("/", indexRouter);

// TODO: MODIFY FOR API catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
