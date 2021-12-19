const express = require("express");
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public

router.get("/", (request, response) => response.send("Auth router"));

module.exports = router;
