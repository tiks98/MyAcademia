const mongoose = require("mongoose");

const challenge = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [],
});

module.exports = mongoose.model("Challenge", challenge);
