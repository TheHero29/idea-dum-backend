const postModel = require("../models/postModel.js");

exports.getPostById = async (req, res) => {
  try {
    const post = await postModel.findById({ _id: req.params.id });
    if (!post)
      return res
        .status(404)
        .send({ success: false, message: "post with given ID not found" });
    res.send(post);
  } catch (err) {
    return res
      .status(404)
      .send({ success: false, message: "post with given ID not found" });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    // console.log(req);
    const posts = await postModel.find({});
    if (posts == [])
      return res
        .status(404)
        .send({ success: false, message: "No posts available" });
    posts.sort((a, b) => {
      const voteDifferenceA = a.upvotes - a.downvotes;
      const voteDifferenceB = b.upvotes - b.downvotes;
      return voteDifferenceB - voteDifferenceA;
    });
    res.send(posts);
  } catch (err) {
    return res
      .status(404)
      .send({ success: false, message: "error in fetching posts" });
  }
};
exports.createPost = async (req, res) => {
  try {
    const body = req.body;
    if (!body.title || !body.content || !body.author)
      return res
        .status(404)
        .send({ success: false, message: "Please enter all the details" });
    const post = postModel.create({
      title: body.title,
      content: body.content,
      author: body.author,
      tags: body.tags,
      image: body.image,
    });
    console.log("post created successfully");
    return res
      .status(201)
      .json({ success: true, message: "post created successfully" });
  } catch (err) {
    return res.status(404).send({
      success: false,
      message: "Some error occured while creating post",
    });
  }
};

exports.updatePostById = async (req, res) => {
  try {
    const post = await postModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post)
      return res
        .status(404)
        .send({ success: false, message: "post with given ID not found" });
    res.send(post);
  } catch (err) {
    return res
      .status(404)
      .send({ success: false, message: "post with given ID not found" });
  }
};

exports.deletePostById = async (req, res) => {
  try {
    const post = await postModel.deleteOne({ _id: req.params.id });
    if (!post)
      return res
        .status(404)
        .send({ success: false, message: "post with given ID not found" });
    res.send(post);
  } catch (err) {
    return res
      .status(404)
      .send({ success: false, message: "post with given ID not found" });
  }
};

exports.upvotePostById = async (req, res) => {
  try {
    console.log(req.body.userId + " upvoting this post");
    const post = await postModel.findById({ _id: req.params.id });
    if (!post)
      return res
        .status(404)
        .send({ success: false, message: "post with given ID not found" });
    if (post.downvotesArray.includes(req.body.userId)) {
      post.downvotesArray.splice(post.downvotesArray.indexOf(req.body.userId),1);
      post.downvotes -= 1;
      await post.save();
    }
    if (!post.upvotesArray.includes(req.body.userId)) {
      post.upvotesArray.push(req.body.userId);
      post.upvotes += 1;
      await post.save();
    }
    else 
    {
      post.upvotesArray.splice(post.upvotesArray.indexOf(req.body.userId),1);
      post.upvotes -= 1;
      await post.save();
    }
    res.send(post);
  } catch (err) {
    return res
      .status(404)
      .send({ success: true, message: "post with given ID not found" });
  }
};

exports.downvotePostById = async (req, res) => {
  try {
    console.log(req.body.userId + " downvoting this post");
    const post = await postModel.findById({ _id: req.params.id });
    if (!post)
      return res
        .status(404)
        .send({ success: false, message: "post with given ID not found" });
    if (post.upvotesArray.includes(req.body.userId)) {
      post.upvotesArray.splice(post.upvotesArray.indexOf(req.body.userId),1);
      post.upvotes -= 1;
      await post.save();
    }
    if (!post.downvotesArray.includes(req.body.userId)) {
      post.downvotesArray.push(req.body.userId);
      post.downvotes += 1;
      await post.save();
    }
    else
    {
      post.downvotesArray.splice(post.downvotesArray.indexOf(req.body.userId),1);
      post.downvotes -= 1;
      await post.save();
    }
    res.send(post);
  } catch (err) {
    return res
      .status(404)
      .send({ success: true, message: "post with given ID not found" });
  }
};
