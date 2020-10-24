const router = require("express").Router();
const auth = require("../../middleware/auth");

const Location = require("../../models/Location");

// @route   POST api/location
// @desc    Create a new location
// @access  Public
router.post("/", async (req, res) => {
  const { name, address1, address2, city, state, zip } = req.body;
  const address = { address1, address2, city, state, zip };

  try {
    location = new Location({ name, address });
    await location.save();
    res.json(location);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
}
);

// @route   PUT api/location/employee/:id
// @desc    Add current user to a location
// @access  Private
router.put("/employee/:id", auth, async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    location.employees.push(req.user.id);
    await location.save();
    res.json(location);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
