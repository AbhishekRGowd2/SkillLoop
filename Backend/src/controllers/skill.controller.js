const Skill = require("../models/Skill.model");

exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

exports.getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({ isActive: true }).populate(
      "userId",
      "name"
    );
    res.json(skills);
  } catch (error) {
    next(error);
  }
};
