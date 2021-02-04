const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passportConfig");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "secretcode",
      sub: userID,
    },
    "secretcode",
    { expiresIn: "1h" }
  );
};

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username } });
    }
  }
);
router.get("/auth/google", (req, res, next) => {
  passport.authenticate("google", { scope: "https://www.google.com/m8/feeds" })(
    req,
    res,
    next
  );
});
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

router.post("/register", (req, res) => {
  //   const { username, password } = req.body;
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has Occured", msgError: true },
      });
    if (doc) {
      res.json({ message: { msgBody: "User Already Exists", msgError: true } });
    }
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({
        message: { msgBody: "Account successfully created", msgError: false },
      });
    }
  });
});
router.get("/user", (req, res) => {
  const { username, role } = req.user;
  res.json({ user: { username } }); // The req.user stores the entire user that has been authenticated inside of it.
});

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Destroying the session at the end
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, success: true });
  }
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
);

module.exports = router;
