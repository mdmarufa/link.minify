const moduleScaffoldingHome = {};
const UserModel = require("../models/userModel");

moduleScaffoldingHome.get = async (req, res, next) => {
  const userId = res.locals.id;

  try {
    const userData = await UserModel.findOne({_id: userId}).populate("links").select({password: 0, __v: 0})
    if(userData) {
      res
      .status(200)
      .send(JSON.stringify(userData))
    } else {
      res.json({
        title: "Please login",
        msg: "Unknow error occuored"
      })
    }

  }catch(err) {
    res.json({
      title: "Sorry somthing error",
      msg: "Please try again later"
    })
    console.log(err)
  }
}

module.exports = moduleScaffoldingHome;