const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        locale: {
            type: String,
            required: true
        },
        roomType: {
            type: String
        },
        parentLocation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location"
        },
        trackers: [
            {
                name: {
                    type: String,
                    required: true,
                },
                completed: {
                    type: Boolean,
                    default: false,
                },
                updatedBy: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = Room = mongoose.model("room", RoomSchema);