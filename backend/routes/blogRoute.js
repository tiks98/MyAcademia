const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const {
  addNewBlog,
  getBlog,
  getBlogwithID,
  deleteBlog,
  getBlogwithUsername,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/newblog", addNewBlog);

router.get("/getblog", getBlog);

router.get("/blog/:blogId", getBlogwithID);

router.get("/blog", getBlogwithUsername);

router.delete("/blog/:blogId", deleteBlog);

module.exports = router;