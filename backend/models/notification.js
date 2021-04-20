const mongoose = require("mongoose");

const notification = new mongoose.Schema({
  notification: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notification);
