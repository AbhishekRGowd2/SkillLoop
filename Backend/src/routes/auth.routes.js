const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("phone").isLength({ min: 10 }).withMessage("Valid phone required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate,
  authController.register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  authController.login
);

module.exports = router;
