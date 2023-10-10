const User = require("../models/User");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
module.exports={
  isAdminAuthenticated : async (req, res, next) => {
  try {
    const { adminToken } = req.cookies;
  

    if (!adminToken) {
      return res.status(401).json({
        message: "Please login as admin first",
      });
    }
    // Verify the admin token
    const decoded = await jwt.verify(adminToken, process.env.JWT_SECRET);

   
    // Find the admin using the decoded ID
    const admin = await Admin.findById(decoded._id);

    if (!admin) {
      return res.status(401).json({
        message: "Admin not found",
      });
    }

    // Attach the admin object to the request
    req.admin = admin;

    // Call next() to proceed to the next middleware/route handler

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
}
