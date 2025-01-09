const express = require("express");
const shortLinkController = require("../controllers/shortLinkRouteController");
const lib = require("../lib/lib");

const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const LinkModel = require("../models/linkModel");

const router = express.Router();

const generateValidObject = async (req, res, next) => {
    const userId = res.locals.id;
  
    try {
      const userData = await UserModel.findOne({ _id: userId });
      if (userData) {
        const newShortLink = {
          ...req.body,
          owner: userId,
          clicks: 0
        };
        if (req.body.customName) {
          const existCustomName = await LinkModel.findOne({customName: req.body.customName})
          if(existCustomName) {
            res
            .status(400)
            .json({
              title: "Custom name exitst",
              msg: "Please change you custom name because the custom name is exists or make it empty for random."
            })
          }else {
            res.locals.linkObject = newShortLink;
            next()
          }
        } else {
          // create new custom name
          (async function generateRandomName() {
            const uniqueId = lib.getUniqueId()
            const id = uniqueId();
  
            const existsUniqueId = await LinkModel.findOne({customName: id})
            if(existsUniqueId) {
              generateRandomName()
            }else {
              newShortLink.customName = id;
              res.locals.linkObject = newShortLink;
              next();
            }
          })()
        }
      } else {
        res
        .status(401)
        .json({
          title: "Please login",
          msg: "Unknow error occuored",
        });
      }
    } catch (err) {
      console.log(err)
      res
      .status(401)
      .json({
        title: "Sorry somthing error",
        msg: "Please try again later",
      });
    }
  }

router.post("/shortlink", lib.checkAuthentication, generateValidObject, shortLinkController.short);
router.delete("/deleteallshortlink", lib.checkAuthentication, shortLinkController.deleteAllShortLink);
router.delete("/delete/:id", lib.checkAuthentication, shortLinkController.delete);

module.exports = router;
