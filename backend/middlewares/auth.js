const User = require("../models/User");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {

  console.log("User Authentication.........");
  try {
    const { token } = req.cookies;
    console.log("The User Token status is.......", token);

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      // If the user is blocked, clear the token in the cookie
      res.clearCookie("token"); // This clears the "token" cookie
      return res.status(403).json({
        message: "You are blocked by  admin",
      });
    }

    

    req.user =  user;

    next();
  } catch (error) {
    console.log("Internal Server Error.......", error);
    console.log("Error message", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

const isBlocked = (req, res, next) => {
  if (req.user && req.user.isBlocked) {
    // If the user is blocked, log them out and redirect them to the login page
    res.clearCookie("token"); // This clears the "token" cookie
 
  }
  // If the user is not blocked, continue to the next middleware/route handler
  next();
};
