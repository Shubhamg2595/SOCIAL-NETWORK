const express = require("express");
const router = express.Router();

//@route  GET api/profiles/test
// @desc  Test profiles Route
// @access  Public

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

module.exports = router;

/*
stuff like Bio , location , experiences , 
education etc
*/
