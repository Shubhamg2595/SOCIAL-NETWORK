const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

module.exports = router;

/*
stuff like user's posts , their comments
*/
