const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.setFullName = function() {
  this.fullName = `${this.lastname}, ${this.firstname}`;
  return this.fullName;
};

UserSchema.methods.setUserName = function() {
  this.userName = `${this.firstname[0].toLowerCase()}${this.lastname.toLowerCase()}`;
  return this.userName;
};

module.exports = User = mongoose.model("user", UserSchema);
