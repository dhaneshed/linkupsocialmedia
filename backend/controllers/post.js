const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.unshift(post._id);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Post created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.deleteOne();

    const user = await User.findById(req.user._id);
  

    const index = user.posts.indexOf(req.params.id);

    user.posts.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likeAndUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      post.likes.push(req.user._id);
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostofFollowing = async (req, res) => {
  try {
    
    const user = await User.findById(req.user?._id);
  

    const posts = await Post.find({
      owner: {
        $in: user?.following,
      },
    }).populate("owner likes comments.user comments.replies.user");
  
    res.status(200).json({
      success: true,
      posts: posts.reverse(),
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.caption = req.body.caption;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    const commentIndex = post.comments.findIndex(
      (item) => item.user.toString() === req.user._id.toString()
    );

    if (commentIndex !== -1) {
      // Update existing comment
      post.comments[commentIndex].comment = req.body.comment;
    } else {
      // Create a new comment
      post.comments.push({
        user: req.user._id,
        comment: req.body.comment,
      });
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added or updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add a new controller to handle replies to comments
exports.replyToComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    const commentIndex = post.comments.findIndex(
      (item) => item._id.toString() === req.params.commentId
    );

    if (commentIndex === -1) {
      res.status(404).json({
        success: false,
        message: "Comment not found",
      });
      return;
    }

    post.comments[commentIndex].replies.push({
      user: req.user._id,
      comment: req.body.comment,
    });

    await post.save();

    res.status(200).json({
      success: true,
      message: "Reply added to the comment",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: "false",
        message: "Post not found",
      });
    }

    //Checking If owner wants to delete

    if (post.owner.toString() === req.user._id.toString()) {
      if (req.body.commentId === undefined) {
        return res.status(400).json({
          success: "false",
          message: "Comment Id is required",
        });
      }

      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();

      return res.status(200).json({
        success: "true",
        message: " Selected Comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === req.user._id.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();

      res.status(200).json({
        success: true,
        message: "Your Comment has deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

exports.reportOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: "false",
        message: "Post not found",
      });
    }

    let reportIndex = -1;

    //Checking if Report already Exists

    post.reports.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        reportIndex = index;
      }
    });

    if (reportIndex !== -1) {
      post.reports[reportIndex].report = req.body.report;
      await post.save();

      res.status(200).json({
        success: "true",
        message: "Post Report Updated",
      });
    } else {
      post.reports.push({
        user: req.user._id,
        report: req.body.report,
      });
      await post.save();
      return res.status(200).json({
        success: "true",
        message: "Post Report  added ",
      });
    }
  } catch (error) {
  
    res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};
