const mongoose = require("mongoose");
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = () => {
  mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.log(`Database is Successfully Connected ${DATABASE_URL}`);
    })
    .catch((error) => {
      console.log(error);
      console.error(error.message);
      process.exit(1);
    });
};

module.exports = connectDB;
