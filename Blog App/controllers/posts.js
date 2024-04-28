const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = await Post.create({ title, body });
    res.status(200).json({
      success: true,
      data: post,
      message: "Post Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server Issue",
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const response = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();
    res.status(200).json({
      success: true,
      data: response,
      message: "All Posts Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server Issues",
    });
  }
};
