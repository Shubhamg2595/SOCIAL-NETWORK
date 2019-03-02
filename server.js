const express = require("express");
const mongoose = require("mongoose");
const app = express();

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongoDB through mongoose
mongoose
  .connect(db)
  .then(() => console.log("MOngodb connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send(" Social Network");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on PORT : ${port}`);
});
