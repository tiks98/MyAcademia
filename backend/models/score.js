const mongoose = require("mongoose");

const score = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userScore: {
    type: Number,
  },
  calculatedIQ: {
    type: Number,
  },
  timeTaken: {
    type: String,
  },
});

module.exports = mongoose.model("Score", score);
