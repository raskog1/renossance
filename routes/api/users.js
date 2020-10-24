const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Location = require("../../models/Location");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("firstname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please enter a valid first name"),

    check("lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Please enter a valid last name"),

    check("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email"),

    check("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least six characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password, department, location } = req.body;
    const username = `${firstname[0].toLowerCase()}${lastname.toLowerCase()}${Math.floor(
      Math.random() * 10
    )}`;

    try {
      let userEmail = await User.findOne({ email });
      let user = await User.findOne({ username });
      let matchLoc = await Location.findById(location);

      if (user || userEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      if (!matchLoc) {
        return res.status(400).json({ errors: [{ msg: "Invalid location" }] });
      }

      user = new User({
        firstname,
        lastname,
        email,
        username,
        password,
        department,
        location
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          loc: user.location
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
