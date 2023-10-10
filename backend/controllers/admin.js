const Admin = require("../models/Admin");
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");

// Admin Authentication
exports.adminRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Admin Credentails", req.body);

    let admin = await Admin.findOne({ email });
    console.log("Admin Already Exists", admin);

    if (admin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin already exists" });
    }

    admin = await Admin.create({
      username,
      email,
      password,
    });

    console.log("Admin create", admin);

    const adminToken = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    console.log("Admin Token ", adminToken);
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("adminToken", adminToken, options).json({
      success: true,
      admin,
      adminToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin does not exist",
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const adminToken = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("adminToken", adminToken, options).json({
      success: true,
      admin,
      adminToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.adminLogout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("adminToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Admin logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.blockedUserLogout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("adminToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Admin logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//Admin User management
//Admin can see the users

exports.viewUsersDetails = async (req, res) => {
  try {
    const users = await User.find({}).populate("posts followers following");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.viewPostsDetails = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("owner likes comments reports");

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin?._id);
    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner reports.user"
      );
      posts.push(post);
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
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
    console.log(" admin delete post request");
    const userId = req.params.userId;
    console.log("UserId is", userId);
    const postId = req.params.postId;
    console.log("PostId is", postId);
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    await cloudinary.v2.uploader.destroy(post.image.public_id);

    await post.deleteOne();

    const user = await User.findById(userId);

    const index = user.posts.indexOf(postId);

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

exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers: totalUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTotalPosts = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      success: true,
      totalPosts: totalPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTotalComments = async (req, res) => {
  try {
    const totalComments = await Post.aggregate([
      {
        $project: {
          totalComments: { $size: "$comments" }, // Calculate the number of comments
        },
      },
      {
        $group: {
          _id: null,
          totalComments: { $sum: "$totalComments" }, // Sum up the comment counts
        },
      },
    ]);

    if (totalComments.length > 0) {
      const totalCommentCount = totalComments[0].totalComments;

      res.status(200).json({
        success: true,
        totalComments: totalCommentCount,
      });
    } else {
      res.status(200).json({
        success: true,
        totalComments: 0, // No posts found
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTotalReports = async (req, res) => {
  try {
    const totalReports = await Post.aggregate([
      {
        $project: {
          totalReports: {
            $size: { $ifNull: ["$reports", []] },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalReports: { $sum: "$totalReports" }, // Sum up the comment counts
        },
      },
    ]);

    if (totalReports.length > 0) {
      const totalReportCount = totalReports[0].totalReports;

      res.status(200).json({
        success: true,
        totalReports: totalReportCount,
      });
    } else {
      res.status(200).json({
        success: true,
        totalReports: 0, // No posts found
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const userData = await User.aggregate([
      {
        $project: {
          name: 1,
          totalPosts: { $size: { $ifNull: ["$posts", []] } },
        },
      },
      {
        $lookup: {
          from: "posts", // Name of the Post collection
          localField: "_id",
          foreignField: "owner",
          as: "userPosts",
        },
      },
      {
        $addFields: {
          totalComments: {
            $sum: {
              $map: {
                input: "$userPosts.comments",
                as: "post",
                in: { $size: { $ifNull: ["$$post", []] } },
              },
            },
          },
        },
      },
    ]);

    console.log("userData is......", userData);
    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log("chart error is...", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.userRegistrationData = async (req, res) => {
  try {
    const startDate = new Date(); // You can set the start date for your analysis
    startDate.setDate(startDate.getDate() - 7); // Go back 7 days from today

    const userData = await User.aggregate([
      {
        $match: {
          registrationDate: { $gte: startDate }, // Filter users registered within the last 7 days
        },
      },
      {
        $group: {
          _id: {
            week: { $isoWeek: '$registrationDate' }, // Group by ISO week number
            year: { $isoWeekYear: '$registrationDate' }, // Group by ISO year
          },
          count: { $sum: 1 }, // Count the number of users in each group
        },
      },
      {
        $sort: { '_id.year': 1, '_id.week': 1 }, // Sort by year and week
      },
    ])

        const postCounts = await Post.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }, // Filter posts created within the last 7 days
        },
      },
      {
        $group: {
          _id: {
            week: { $isoWeek: '$createdAt' }, // Group by ISO week number
            year: { $isoWeekYear: '$createdAt' }, // Group by ISO year
          },
          count: { $sum: 1 }, // Count the number of posts in each group
        },
      },
      {
        $sort: { '_id.year': 1, '_id.week': 1 }, // Sort by year and week
      },
    ]);


    res.status(200).json({ success: true, userData, postCounts });
  } catch (error) {
  
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Block a user
exports.blockUser = async (req, res) => {
  console.log("Block User is........");
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, { isBlocked: true });

    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }

    res.status(200).json({success:true, message: "User blocked successfully" });
  } catch (error) {
    console.log("The error is......",error);
    console.error(error);
    res.status(500).json({ success:false, message: error.message });
  }
};

// Activate a user
exports.activateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, { isBlocked: false });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User activated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};