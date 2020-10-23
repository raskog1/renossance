const router = require("express").Router();
const auth = require("../../middleware/auth");

const Location = require("../../models/Location");

// @route   GET api/location
// @desc    Get all locations, sorted alpha
// @access  Public
router.get("/all", async (req, res) => {
  try {
    const locations = await Location.find().sort({ name: -1 });
    res.json(locations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

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

// @route   PUT api/location/rooms/:locId/:roomId
// @desc    Add a room to a location
// @access  Public
// *********UNTESTED***********
router.put("/rooms/:locId/:roomId", async (req, res) => {
  try {
    const location = await Location.findById(req.params.locId);
    location.rooms.push(req.params.roomId);
    await location.save();
    res.json(location);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;
