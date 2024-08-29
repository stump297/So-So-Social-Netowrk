const router = require("express").Router();
const { User, Thought } = require("../models");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
