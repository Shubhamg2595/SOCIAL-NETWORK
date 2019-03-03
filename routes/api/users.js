const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validations

const validateRegisterInput = require("../../validation/register");

const validateLoginInput = require("../../validation/login");

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
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
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
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email: email }).then(user => {
    //check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //check password, if user exist
    //since the password stored in db is encrypted
    // using bcrypt ,we will use it again to compare the password

    bcrypyt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //if user password matches, this is where we will create JWT tokens

        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(404).json(errors);
      }
    });
  });
});

//@route  POST api/users/current
// @desc  Returning current user

// @access  private
//since we have created a authenticated route,no one can access it without bearer token
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json({ msg: "Success" });
    // res.json(req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;

/*
stuff like auth , login
*/
