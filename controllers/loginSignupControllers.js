const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");



const loginSignupScaffolding = {};

loginSignupScaffolding.signup = async (req, res, next) => {

  const nUser = {...req.body};
  delete nUser.password

  nUser.password = await bcrypt.hash(req.body.password, Number(process.env.BcHash))

  try {
    const isUserExists = await UserModel.findOne({email: req.body.email})
    if(!isUserExists) {
      const newUser = UserModel(nUser)
      const serverRes = await newUser.save()
      res
      .status(201)
      .json({
        title: "Account created",
        msg: `Account create remember you email = ${serverRes.email} and password ${req.body.password}`
      })
    } else {
      res
      .status(400)
      .json({
        title: "Emali exitst",
        msg: "Email already in use"
      })
    }
  } catch(err) {
    res.json({msg: "Server side err"})
  }
}
loginSignupScaffolding.login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({email: req.body.email})
    console.log(user);
    if(user) {
      const userDoc = user;
      const isPasswordValid = await bcrypt.compare(req.body.password, userDoc.password)
      if(isPasswordValid) {
        //create jwt token
        const userToken = jwt.sign({ id: userDoc._id }, process.env.JWT_KEY, { expiresIn: Date.now() + ((1 * 60 * 60 * 1000) * 24) * 30 })
        res
        .cookie("token", "Bearer " + userToken, {httpOnly: true, sameSite: "lax", maxAge: 30 * (24 * 60 * 60 * 1000)})
        .status(200)
        .json({ title: "Login success" });
      } else {
        res
        .status(400)
        .json({
          title: "Error",
          msg: "Invalid username/password"
        })
      }
    } else {
      res
      .status(400)
      .json({
        title: "Error",
        msg: "Invalid username/password"
      })
    }
  } catch(err) {
    res.json({
      title: "Error",
      msg: "Sorry please try again later"
    })
  }
}

module.exports = loginSignupScaffolding;
