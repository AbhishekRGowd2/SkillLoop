const Request = require("../models/Request.model");
const mongoose = require("mongoose");
const Skill = require("../models/Skill.model");

exports.createRequest = async (req, res, next) => {
  try {
    const { skillId } = req.body;
    
    // Check if skill exists and belongs to other user
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.userId.toString() === req.user.userId) {
      return res.status(400).json({ message: "You cannot request your own skill" });
    }

    const request = await Request.create({
      ...req.body,
      fromUserId: req.user.userId,
    });

    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

exports.getMyRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({
      $or: [{ fromUserId: req.user.userId }, { toUserId: req.user.userId }],
    })
      .populate("skillId")
      .populate("fromUserId", "name")
      .populate("toUserId", "name");

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

exports.updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Accepted", "Rejected", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid request ID" });
    }

    const request = await Request.findById(id).populate("skillId");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Only skill owner can accept/reject
    if (
      ["Accepted", "Rejected"].includes(status) &&
      request.skillId.userId.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You are not authorized to update this request",
      });
    }

    // Only requester can mark as completed
    if (
      status === "Completed" &&
      request.fromUserId.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Only requester can complete the request",
      });
    }

    // Valid state transitions
    if (status === "Completed" && request.status !== "Accepted") {
      return res.status(400).json({
        message: "Only accepted requests can be completed",
      });
    }

    request.status = status;
    await request.save();

    res.json({
      success: true,
      message: `Request ${status.toLowerCase()}`,
      request,
    });
  } catch (error) {
    next(error);
  }
};
