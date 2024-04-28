// creating the server
const express = require("express");
const app = express();

// importing .env file
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// using middlewares
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.json());

// creating the server
app.listen(PORT, () => {
  console.log(`Server Started Successfully at Port ${PORT}`);
});

// creating the root path
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server Connected Successfully",
  });
});

// connecting with DB
const connectDB = require("./config/database");
connectDB();

// connecting the routes
const file = require("./routes/fileUplaod");
app.use("/api/v1/upload", file);

// connecting with cloudinary
const connectClodinary = require("./config/cloudinary");
connectClodinary();
