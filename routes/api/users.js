const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypyt = require("bcryptjs");

//load User model
const User = require("../../models/User");

//@route  GET api/users/test
// @desc  Test users Route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

//@route  GET api/users/register
// @desc  Register a User :
// User.findOne is  being used  to find whether
// an email already exist  in db , which will be
// provided by user using react Form

// @access  Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already Exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypyt.genSalt(10, (err, salt) => {
        bcrypyt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;

/*
stuff like auth , login
*/
