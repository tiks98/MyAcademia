const mongoose = require("mongoose");

const profile = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  collegeName: {
    type: String,
  },
  location: {
    type: String,
  },
  IQ: {
    type: Number,
  },
  about: {
    type: String,
  },
  isFaculty: {
    type: Boolean,
    default: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", profile);
