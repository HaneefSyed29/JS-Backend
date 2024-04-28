const express = require("express");
const router = express.Router();

// importing controllers
const { createPost, getPosts } = require("../controllers/posts");
const { likePost, unlikePost } = require("../controllers/likes");
const { createComment } = require("../controllers/comments");

//routing
router.post("/posts/create", createPost);
router.get("/posts", getPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);
router.post("/comments/create", createComment);

module.exports = router;
