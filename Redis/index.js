const express = require("express");
const axios = require("axios");
const app = express();
const client = require("./client");

// this request is getting so delayed that it takes 1.7s to come rather than that we need to implement redis for the fast data retrive
app.get("/", async (req, res) => {
  // before directly checking in the database we can first check the cache value
  const cache = await client.get("posts");
  // if there exist a cache value then we will return the same
  // after the data comes to the picture then parse it in json
  if (cache) return res.json(JSON.parse(cache));
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  // if the cache is not present then we will add this data to redis
  // whenever we are getting the redis make sure it is in string format
  await client.set("posts", JSON.stringify(data));
  // after adding it to the redis we will make sure of expiry
  await client.expire("posts", 30);
  return res.json(data);
});

app.listen(8000, () => {
  console.log("Server Started Successfully");
});
