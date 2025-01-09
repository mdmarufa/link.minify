const bcrypt = require("bcrypt");

const UserModel = require("../models/userModel");
const LinkModel = require("../models/linkModel");

const moduleScaffoldingUseLink = {}

moduleScaffoldingUseLink.get = async (req, res, next) => {
  try {
    const linkObj = await LinkModel.findOne({customName: req.params.customName}).select({url: 1, password: 1, date: 1, customName: 1, maxClicks: 1, clicks: 1, _id: 0}) 
    const clicks = linkObj.clicks || 0;
    const ck = clicks + 1;
    await LinkModel.updateOne({customName: linkObj.customName}, {$set: {clicks:  ck}})
    if(linkObj) {
      console.log(linkObj)
      res.json(linkObj)
    } else {
      res
      .status(404)
      .json({
        title: "Not found!",
        msg: "It's look like link not found please you URL address."
      })
    }

  } catch(err) {
    console.log(err)
  }
}

module.exports = moduleScaffoldingUseLink;