const mongoose = require("mongoose");

const challenge = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  optionOne: {
    type: String,
  },
  optionTwo: {
    type: String,
  },
  optionThree: {
    type: String,
  },
  optionFour: {
    type: String,
  },
});

module.exports = mongoose.model("Challenge", challenge);
