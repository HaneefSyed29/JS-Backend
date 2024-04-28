const express = require("express");
const router = express.Router();
const User = require("../models/myuser");

const { login, signup } = require("../controllers/auth");
const { auth, isAdmin, isStudent } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

// from now onwards we will be creating the protected routes
router.get("/getDetails", auth, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user: user,
      message: "Successfully Retrive Data",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/auth", auth, async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User is Logged in through Token",
  });
});

router.get("/student", auth, isStudent, async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User is Logged in Student Page",
  });
});

router.get("/admin", auth, isAdmin, async (req, res) => {
  res.status(200).json({
    success: true,
    message: "User is Logged in Admin Page",
  });
});

module.exports = router;
