const express = require("express");
const router = express.Router();

//@route  GET api/posts/test
// @desc  Test postss Route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

module.exports = router;

/*
stuff like user's posts , their comments
*/
