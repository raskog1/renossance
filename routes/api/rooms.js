const router = require("express").Router();
const auth = require("../../middleware/auth");

const Room = require("../../models/Room");
const Location = require("../../models/Location");

// @route   POST api/rooms
// @desc    Create a new room with current logged in location
// @desc    Adds room object to corresponding location
// @access  Private
router.post("/", auth, async (req, res) => {
    const { name, roomCode, building, type } = req.body;
    const parentLocation = req.user.loc;

    try {
        const room = new Room({ name, roomCode, building, type, parentLocation });
        const location = await Location.findById(req.user.loc);
        location.rooms.push(room);
        await room.save();
        await location.save();
        res.json(room);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// @route   GET api/rooms
// @desc    Get all rooms from current logged in location
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const rooms = await Room.find({ parentLocation: req.user.loc });
        res.json(rooms);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;