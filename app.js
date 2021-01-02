// -------------------------------
// APP IMPORTS
// -------------------------------
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport")(passport);

// -------------------------------
// LOCAL VARIABLES, MIDDLEWARES
// -------------------------------

// --- DB CONNECTION
const DB_URI = "<< Enter your MongoDB URL Here >>";
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ DATABASE Connected...!"))
  .catch((error) => console.log("❌ DATABASE Connection Faild."));

// --- Setting Up EJS Templates to Server
app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.use(express.static("public"));

// --- Body Parser for POST requests
app.use(express.urlencoded({ extended: true }));

// --- Express Session
app.use(
  session({
    secret: "<YourSecretKey>",
    resave: true,
    saveUninitialized: true,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// --- Flash Messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_message");
  res.locals.error_msg = req.flash("error_message");
  res.locals.error = req.flash("error");
  next();
});

// -------------------------------
// ROUTES
// -------------------------------
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

// -------------------------------
// LISTING TO THE SERVER
// -------------------------------
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`SERVER STRARTED LISTENING ON PORT | ${PORT}`)
);
