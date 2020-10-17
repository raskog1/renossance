const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
    },
    employees: {
      type: [String],
    },
    rooms: [
      {
        locale: {
          type: String,
          required: true,
        },
        roomType: {
          type: String,
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
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
            },
            date: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = Location = mongoose.model("location", LocationSchema);
