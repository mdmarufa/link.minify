const mongoose = require("mongoose");
const shortLinkSchema = require("../schemas/shortLinkSchema");

const LinkModel = mongoose.model("link", shortLinkSchema);

module.exports = LinkModel;