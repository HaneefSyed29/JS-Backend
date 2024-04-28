const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

const todoRoutes = require("./routes/todos");
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server Started Successfully at port ${PORT}`);
});

app.get("/", (request, response) => {
  response.send(`<h1>This is Home Page</h1>`);
});

const dbConnect = require("./config/database");
dbConnect();
