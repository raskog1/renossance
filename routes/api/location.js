const router = require("express").Router();

// @route   GET api/location
// @desc    Get user information
// @access  Public
router.get("/", (req, res) => {
  res.json("Hitting the Location route");
});

module.exports = router;
