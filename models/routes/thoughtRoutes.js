const router = require("express").Router();
const { Thought, User } = require("../modles");

// get all thoughts
router.get("/", async (req, res) => {
  try {
    const throughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});
