// IMPORT FOR CONFIGURATION STRATEGY
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Strategy
module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          bcrypt.compare(password, user.password, (err, isComparedAndMatch) => {
            if (err) throw err;

            if (isComparedAndMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect.!" });
            }
          });
        })
        .catch((err) => {
          if (err) {
            console.log("An Error occured in Password Comparing");
          }
          done(null, false, { message: "Email is not registered." });
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
