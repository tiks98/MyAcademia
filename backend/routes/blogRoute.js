const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const {
  getBlog,
  addBlog
} = require("../controllers/blogController");

const router = express.Router();

router.get("/getblog", getBlog);

router.post("/addblog",addBlog)

module.exports = router;