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

// @route   PUT api/rooms/trackers
// @desc    Add a tracker to a room
// @access  Private
router.put("/trackers/:id", auth, async (req, res) => {
    const tracker = { name: req.body.name, updatedBy: req.user.id };
    try {
        const room = await Room.findById(req.params.id);
        room.trackers.push(tracker);
        await room.save();
        res.json(room);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }

})

// @route   PUT api/rooms/trackers/toggle/:id
// @desc    Toggle tracker complete/incomplete
// @access  Private
router.put("/trackers/toggle/:id", auth, async (req, res) => {

    try {
        const room = await Room.findById(req.params.id);

        for (let i = 0; i < room.trackers.length; i++) {
            if (room.trackers[i].name === req.body.name) {
                room.trackers[i].completed = !room.trackers[i].completed;
            };
        }
        await room.save();
        res.json(room);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

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