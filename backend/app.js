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

mongoose.connect(
  "mongodb+srv://MyAcademia:MyAcademia987789@cluster0.czdwc.mongodb.net/myacademia?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;

db.on("error", () => console.log("There was a error connecting to MongoDB"));
db.once("open", () => console.log("We have connected to MongoDB"));

var authRouter = require("./routes/auth");
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

// Reference: https://github.com/woodburydev/passport-local-video/blob/master/backend/server.js
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("Username or Password is incorrect");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        res.locals.isLoggedIn = req.isAuthenticated();
        res.locals.user = req.user;

        if (req.isAuthenticated()) {
          res.locals.role = req.user.role;
        } else {
          res.locals.role = null;
        }
        console.log(req.user);
      });
    }
  })(req, res, next);
});
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});
app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

app.get("/logout", (req, res) => {
  // Destroying the session at the end
  req.session.destroy(() => {
    // redirecting to the Index page after destroying the session.
    res.redirect("/");
  });
});

app.listen(4000, () => {
  console.log("Server has started");
});

module.exports = app;
