const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

const auth = require("./routes/Auth");
app.use("/api/v1", auth);

const connectDB = require("./config/database");
connectDB();

app.listen(PORT, () => {
  console.log(`Server is Started at Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Connected Successfully",
  });
});
