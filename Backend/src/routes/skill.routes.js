const express = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const skillController = require("../controllers/skill.controller");

const router = express.Router();

router.post(
  "/",
  auth,
  [
    body("category").notEmpty().withMessage("Category is required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("experienceLevel")
      .isIn(["Beginner", "Intermediate", "Expert"])
      .withMessage("Invalid experience level"),
  ],
  validate,
  skillController.createSkill
);

router.get("/", skillController.getAllSkills);

module.exports = router;
