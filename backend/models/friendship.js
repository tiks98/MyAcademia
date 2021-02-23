const mongoose = require("mongoose");

const friendship = new mongoose.Schema({
  requester: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Friendship", friendship);
