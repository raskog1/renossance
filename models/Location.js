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
      zip: {
        type: Number
      }
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      }
    ],
  },
  { timestamps: true }
);

module.exports = Location = mongoose.model("location", LocationSchema);
