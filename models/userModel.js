const mongoose = require("mongoose"); // Corrected mongoose spelling
const UserSchema = require("../schemas/userSchemas");

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;