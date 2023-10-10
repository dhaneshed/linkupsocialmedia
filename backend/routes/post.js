const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostofFollowing,
  updateCaption,
  commentOnPost,
  deleteComment,
  reportOnPost,
  replyToComment,
} = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated,getPostofFollowing);

router.route("/post/comment/:id").put(isAuthenticated,commentOnPost).delete(isAuthenticated,deleteComment);

router.route("/post/comment/:id/reply/:commentId").put(isAuthenticated, replyToComment);

router.route("/post/report/:id").put(isAuthenticated,reportOnPost);


module.exports = router;
