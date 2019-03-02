const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
//load User model
const User = require("../../models/User");

//@route  GET api/users/test
// @desc  Test users Route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

//@route  POST api/users/register
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

//@route  POST api/users/login
// @desc  Returning a JWT

// @access  Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email: email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ email: "User not FOund" });
    }

    //check password, if user exist
    //since the password stored in db is encrypted
    // using bcrypt ,we will use it again to compare the password

    bcrypyt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //if user password matches, this is where we will create JWT tokens

        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        //Sign Token
        jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer" + token
          });
        });
      } else {
        return res.status(404).json({ password: "Password Incorrect" });
      }
    });
  });
});

module.exports = router;

/*
stuff like auth , login
*/
