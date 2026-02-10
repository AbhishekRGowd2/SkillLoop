const express = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const requestController = require("../controllers/request.controller");

const router = express.Router();

router.post(
  "/",
  auth,
  [
    body("skillId").notEmpty().withMessage("Skill ID is required"),
    body("toUserId").notEmpty().withMessage("Target user ID is required"),
  ],
  validate,
  requestController.createRequest
);

router.get("/", auth, requestController.getMyRequests);

router.patch(
  "/:id/status",
  auth,
  [
    body("status")
      .isIn(["Accepted", "Rejected", "Completed"])
      .withMessage("Invalid status"),
  ],
  validate,
  requestController.updateRequestStatus
);

module.exports = router;
