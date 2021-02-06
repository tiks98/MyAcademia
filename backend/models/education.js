const mongoose = require("mongoose");

const education = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
  },
  collegeLocation: {
    type: String,
  },
  courseName: {
    type: String,
    required: true,
  },
  graduationDate: {
    type: Date,
  },
  currentCollege: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Education", education);
