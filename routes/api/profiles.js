const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//LOAD Profile model
const Profile = require("../../models/Profile");
//Load User Profile
const User = require("../../models/User");

//@route  GET api/profiles/test
// @desc  Test profiles Route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//@route  GET api/profiles
// @desc  Get current users Profile
// @access  Private as user  willl only be able to see the profile if user has successfully logged in
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors.noprofile);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
