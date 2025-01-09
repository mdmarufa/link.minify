const mongoose = require("mongoose"); // Corrected mongoose spelling

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  links: [{
    type: mongoose.Types.ObjectId,
    ref: "link"
  }]
});

module.exports = UserSchema;