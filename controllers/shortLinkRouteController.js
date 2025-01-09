const shortLinkController = {};
const bcrypt = require("bcrypt");

const UserModel = require("../models/userModel");
const LinkModel = require("../models/linkModel");

shortLinkController.short = async (req, res, next) => {
  if(res.locals.linkObject) {
    console.log(res.locals.linkObject)
    try {
      const storedLinkObj = new LinkModel(res.locals.linkObject)
      const linkObjStoringRes = await storedLinkObj.save();
      await UserModel.updateOne({_id: res.locals.id}, {$push: {links: linkObjStoringRes._id}})
      res.json(linkObjStoringRes)
    } catch(err) {
      res
      .status(401)
      .json({
        title: "Unknow error",
        msg: "Sorry it's look like somthing error we will try to solve please try again later."
      })
    }
  } else {
    res
    .status(401)
    .json({
      title: "Unknow error",
      msg: "Sorry its look like somthing error we will try to solve please try again later."
    })
  }
};

shortLinkController.deleteAllShortLink = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({_id: res.locals.id})
    if(user) {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
      if(isPasswordValid) {
        const deletedLlinks = await LinkModel.deleteMany({})
        if(deletedLlinks.acknowledged) {
          res.json({linksDeleted: true})
        }
      } else {
        res.json({
          title: "Password invalid",
          msg: "Please check you password and try again later Thank you."
        })
      }
    } else {
      res.json({
        title: "Please login",
        msg: "Unknow error occuored"
      })
    }
  } catch(err) {
    res.json({
      title: "Please login",
      msg: "Unknow error occuored"
    })
  }
}

shortLinkController.delete = async (req, res, next) => {
  try {
    const deletedLink = await LinkModel.findByIdAndDelete({_id: req.params.id})
    console.log(deletedLink)

    if(deletedLink) {
      res.json({
        title: "Deleted successfull",
        msg: "Link deleted successful"
      })
    }

  } catch(err) {
    console.log(err)
    res.json({
      title: "Unknow error",
      msg: "Please try again later"
    })
  }
}

module.exports = shortLinkController;
