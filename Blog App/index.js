const express = require("express");
const app = express();

app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT;

const appRoutes = require("./routes/blogs");
app.use("/api/v1", appRoutes);

app.listen(PORT, () => {
  console.log(`Server has Successfully Started at Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>This is Home page of Blog App</h1>`);
});

const dbConnect = require("./config/database");
dbConnect();
