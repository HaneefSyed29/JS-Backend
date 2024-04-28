const myUser = require("../models/myuser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // extract the data from req.body
    const { name, email, password, role } = req.body;
    // check for validation
    if (!name || !email || !password || !role) {
      return res.status(500).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    // check if the user is already present or not
    const user = await myUser.findOne({ email });
    if (user) {
      return res.status(500).json({
        success: false,
        message: "User Already Exixts",
      });
    }
    // hashed the password and then stored the hashed password in DB
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await myUser.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      res.status(200).json({
        success: true,
        user: newUser,
        message: "User Created Successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in Hashing Password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // extracting the email and password
    const { email, password } = req.body;
    // check for validation
    if (!password || !email) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }
    // now check wheather the user is present or not
    let user = await myUser.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }
    // if user exist then check the given password is correct or not
    const payload = {
      email: email,
      id: user._id,
      role: user.role,
    };
    console.log(password);
    if (await bcrypt.compare(password, user.password)) {
      // successfully created a token at the time of login
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token: token,
        user: user,
        message: "Successfully Logged In",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in Login Controller",
    });
  }
};
