const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
var User = require("./models/user");
app.use(cookieParser());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://MyAcademia:MyAcademia987789@cluster0.czdwc.mongodb.net/myacademia?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;

db.on("error", () => console.log("There was a error connecting to MongoDB"));
db.once("open", () => console.log("We have connected to MongoDB"));

var authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
// var indexRouter = require("./index");
// var homeRouter = require("./routes/home");

//using Middleware -- Reference: https://github.com/woodburydev/passport-local-video/blob/master/backend/server.js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// app.use("/", authRouter); //routing it to authRouter
app.use("/user", userRouter);

app.listen(4000, () => {
  console.log("Server has started");
});

module.exports = app;
