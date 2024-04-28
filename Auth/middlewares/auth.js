const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // console.log("Body", req.body.token);
    // console.log("Cookie", req.cookies.token);
    // console.log("Header", req.header("Authorization").replace("Bearer ", ""));
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Need Token",
      });
    }
    try {
      let payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Problem in Auth Middleware",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role != "Admin") {
      return res.status(500).json({
        success: false,
        message: "You are not uthorized for Admin Route",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Problem in isAdmin Middleware",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role != "Student") {
      return res.status(500).json({
        success: false,
        message: "You are not uthorized for Student Route",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Problem in isStudent Middleware",
    });
  }
};
