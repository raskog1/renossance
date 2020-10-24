const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        roomCode: {
            type: String
        },
        parentLocation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },
        building: {
            type: String
        },
        type: {
            type: String,
            enum: ["Guest Room", "Banquet", "Public", "Office", "Other"]
        },
        features: [String],
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