const mongoose = require("mongoose");

const work = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  employerName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  currentJob: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Work", work);
