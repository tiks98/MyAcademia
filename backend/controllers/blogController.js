const Blog = require('../models/blog')

export const getBlog = (req, res) => {
  Blog.find().then(blog => res.json(blog)).catch(`Didn't work`);
}

export const addBlog = (req, res) => {
  const newBlog = new Blog({
    username: req.body.username,
    content: req.body.content,
    contentURL: req.body.contentURL,
    type: req.body.type,
    sharing: req.body.sharing,
    liked: false});
newBlog.save().then(blog => res.json(blog));
}
