//Reference: https://github.com/woodburydev/passport-local-video/blob/master/backend/passportConfig.js

const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy,
  GoogleStrategy = require("passport-google-oauth2").Strategy,
  JwtStrategy = require("passport-jwt").Strategy;

module.exports = function (passport) {
  const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies["access_token"];
    }
    return token;
  };

  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "255153393550-c00iv7khe28pcrheeitfh6p20h6ie83o.apps.googleusercontent.com",
        clientSecret: "_9mNDUvMwuabSo2s_GoIgr - C",
        callbackURL: "http://localhost:4000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    )
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: "secretcode",
      },
      (payload, done) => {
        User.findById({ _id: payload.sub }, (err, user) => {
          if (err) return done(err, false);
          if (user) return done(null, user);
          else return done(null, false);
        });
      }
    )
  );

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });
  passport.deserializeUser((id, callback) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      callback(err, userInformation);
    });
  });
};
