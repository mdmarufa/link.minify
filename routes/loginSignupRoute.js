const express = require("express");
const { check, validationResult } = require("express-validator");

const loginSignupScaffolding = require("../controllers/loginSignupControllers");

const router = express.Router();

const isValid = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res
      .status(400)
      .json(errors.array())
  }
  next()
}

const signupValidationSchema = [
  check('firstName')
    .trim()
    .isString()
    .withMessage("First name must be string")
    .isLength({min: 2})
    .withMessage("First name must be greter or equal than 2")
    .isLength({max: 30})
    .withMessage("First ame must be less than 30"),
  check('lastName')
    .trim()
    .isString()
    .withMessage("Last name must be string")
    .isLength({min: 2})
    .withMessage("Last name must be greter or equal than 2")
    .isLength({max: 30})
    .withMessage("Last name must be less than 30"),
  check("email")
    .trim()
    .isLowercase()
    .withMessage("Email must be lowercase")
    .isEmail()
    .withMessage("Invalid email"),
  check("password")
    .isString()
    .withMessage("Password must be string")
    .isLength({min: 6})
    .withMessage("Password must be greter than 6")
    .isLength({max: 30})
    .withMessage("Password must be less than 31"),
  check("confirmPassword")
    .isString()
    .withMessage("confirmPassword must be string")
    .custom((value, { req }) => {
      if(value !== req.body.password) return false
      return true
    })
    .withMessage("confirmPassword not match")
];

const loginValidationSchema = [
  check("email")
    .trim()
    .isLowercase()
    .withMessage("Email must be lowercase")
    .isEmail()
    .withMessage("Invalid email"),
  check("password")
    .isString()
    .withMessage("Password must be string")
    .isLength({min: 6})
    .withMessage("Password must be greter than 6")
    .isLength({max: 30})
    .withMessage("Password must be less than 31"),
];

router.post('/signup',signupValidationSchema, isValid, loginSignupScaffolding.signup)
router.post('/login',loginValidationSchema, isValid, loginSignupScaffolding.login)


module.exports = router;