const express = require("express");
const router = express.Router();
const isAdminAuthenticated = require("../middlewares/adminAuth");
const {
  adminRegister,
  adminLogin,
  adminLogout,
  myProfile,
  viewUsersDetails,
  getUserProfile,
  getUserPosts,
  deletePost,
  getTotalUsers,
  getTotalPosts,
  getTotalComments,
  getTotalReports,
  getUserData,
  viewPostsDetails,
  userRegistrationData,
  blockUser,
  activateUser,
} = require("../controllers/admin");

router.route("/register").post(adminRegister);

router.route("/login").post(adminLogin);

router.route("/logout").get(adminLogout);

router.route("/me").get(isAdminAuthenticated.isAdminAuthenticated, myProfile);

router
  .route("/users")
  .get(isAdminAuthenticated.isAdminAuthenticated, viewUsersDetails);

router
  .route("/posts")
  .get(isAdminAuthenticated.isAdminAuthenticated, viewPostsDetails);
router
  .route("/user/:id")
  .get(isAdminAuthenticated.isAdminAuthenticated, getUserProfile);

router
  .route("/userposts/:id")
  .get(isAdminAuthenticated.isAdminAuthenticated, getUserPosts);

router.route("/block/:userId").put(blockUser);

router
  .route("/activate/:userId")
  .put(isAdminAuthenticated.isAdminAuthenticated, activateUser);
router
  .route("/user/:id")
  .get(isAdminAuthenticated.isAdminAuthenticated, getUserProfile);

router
  .route("/post/:userId/:postId")
  .delete(isAdminAuthenticated.isAdminAuthenticated, deletePost);

router
  .route("/userCount")
  .get(isAdminAuthenticated.isAdminAuthenticated, getTotalUsers);

router
  .route("/postCount")
  .get(isAdminAuthenticated.isAdminAuthenticated, getTotalPosts);

router
  .route("/totalComments")
  .get(isAdminAuthenticated.isAdminAuthenticated, getTotalComments);

router
  .route("/totalReports")
  .get(isAdminAuthenticated.isAdminAuthenticated, getTotalReports);

router
  .route("/userData")
  .get(isAdminAuthenticated.isAdminAuthenticated, getUserData);

router
  .route("/userRegister")
  .get(isAdminAuthenticated.isAdminAuthenticated, userRegistrationData);

module.exports = router;
