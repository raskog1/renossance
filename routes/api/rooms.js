const router = require("express").Router();

const Room = require("../../models/Room");

// @route   GET api/location
// @desc    Get user information
// @access  Public
router.get("/", (req, res) => {
    res.json("Hitting the Rooms route");
});

module.exports = router;