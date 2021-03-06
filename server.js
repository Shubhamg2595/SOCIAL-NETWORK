const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
/*to get access to request body we use bodyparser*/
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to mongoDB through mongoose
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MOngodb connected"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//Passport Config
//in this config file, we have passport auth. strategy
require("./config/passport")(passport);

//using my Routes

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on PORT : ${port}`);
});
