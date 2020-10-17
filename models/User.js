const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      enum: [
        "Housekeeping",
        "Engineering",
        "Security",
        "Front Desk",
        "EC",
        "Banquets",
        "Food and Beverage",
      ],
    },
  },
  { timestamps: true }
);

UserSchema.methods.setFullName = function() {
  this.fullName = `${this.lastname}, ${this.firstname}`;
  return this.fullName;
};

module.exports = User = mongoose.model("user", UserSchema);
