const postModel = require("../models/postModel.js");

exports.getPostById = async (req, res) => {
  try {
    const post = await postModel.findById({ _id: req.params.id });
    if (!post) return res.status(404).send("post with given ID not found");
    res.send(post);
  } catch (err) {
    return res.status(404).send("post with given ID not found");
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find({});
    if (posts == []) return res.status(404).send("No posts available");
    posts.sort((a, b) => {
      const voteDifferenceA = a.upvotes - a.downvotes;
      const voteDifferenceB = b.upvotes - b.downvotes;
      return voteDifferenceB - voteDifferenceA;
    });
    res.send(posts);
  } catch (err) {
    return res.status(404).send("error in fetching posts");
  }
};
exports.createPost = async (req, res) => {
  try {
    const body = req.body;
    if (!body.title || !body.content || !body.author)
      return res.status(404).send("Please enter all the details");
    const post = postModel.create({
      title: body.title,
      content: body.content,
      author: body.author,
      tags: body.tags,
      image: body.image,
    });
    console.log("post created successfully");
    return res.status(201).json({ message: "post created successfully" });
  } catch (err) {
    return res.status(404).send("Some error occured while creating post");
  }
};

exports.updatePostById = async (req, res) => {
  try {
    const post = await postModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).send("post with given ID not found");
    res.send(post);
  } catch (err) {
    return res.status(404).send("post with given ID not found");
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const post = await postModel.deleteOne({ _id: req.params.id });
    if (!post) return res.status(404).send("post with given ID not found");
    res.send(post);
  } catch (err) {
    return res.status(404).send("post with given ID not found");
  }
};
