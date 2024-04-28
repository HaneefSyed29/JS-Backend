const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const newLike = await like.save();
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: newLike._id } },
      { new: true }
    )
      .populate("likes")
      .exec();
    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "Posted Liked Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server Issue",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike?._id } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "Posted unLiked Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Server Issue",
    });
  }
};
