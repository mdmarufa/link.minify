const mongoose = require("mongoose");

const LinkSchemas = new mongoose.Schema({
  url: {
    type: String,
    requred: true
  },
  password: String,
  expireDate: Date,
  maxClicks: Number,
  clicks: Number,
  customName: String,
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "users"
  }
});


module.exports = LinkSchemas