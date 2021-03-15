const mongoose = require("mongoose");

const blog = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  contentURL: {
    type: String,
    required: true,
  },
  postdate: {
    type: Date,
  },
  liked: {
    type: Boolean,
    default: false,
  },
  professon: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Blog", blog);
