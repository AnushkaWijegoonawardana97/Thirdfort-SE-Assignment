const express = require("express");
const router = express.Router();

// @route   GET api/notes
// @desc    Test route
// @access  Public

router.get("/", (request, response) => response.send("Notes router"));

module.exports = router;
