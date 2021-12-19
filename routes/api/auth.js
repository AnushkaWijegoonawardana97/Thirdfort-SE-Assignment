const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Authorization Routes
// @access  Private

router.get("/", auth, async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select("-password");

    response.json(user);
  } catch (error) {
    console.log(error.message);

    response.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = request.body;

    try {
      // Check User Exists
      let user = await User.findOne({ email });

      if (!user) {
        return response.status(400).json({
          errors: [{ msg: "Invalid user credentials" }],
        });
      }

      const isPWMatch = await bcrypt.compare(password, user.password);

      if (!isPWMatch) {
        return response.status(400).json({
          errors: [{ msg: "Invalid user credentials" }],
        });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          response.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      response.status(500).send("Server Error");
    }
  }
);

module.exports = router;
