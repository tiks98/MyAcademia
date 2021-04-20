const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required:true
  },
  contentURL: {
    type: String,
    required: true
  },
  postdate: {
    type: Date,
    default:Date.now
  },
  liked: {
    type: Boolean,
    default: false
  },
  sharing:{
    type:String,
    required:true
  },
  type:{
    type: String,
    required:true
  }
});

module.exports = mongoose.model("blog", Blog);
