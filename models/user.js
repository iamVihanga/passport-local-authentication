// MONGOOSE LIBRARY
const mongoose = require("mongoose");

// DATABASE Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User1", UserSchema);

// EXPORT MODEL
module.exports = User;
