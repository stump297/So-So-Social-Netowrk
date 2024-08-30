const router = require("express").Router();
const { Thought, User } = require("../models");

// Get all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single thought by ID
router.get("/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this ID!" });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new thought
router.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a thought by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedThought) {
      return res
        .status(404)
        .json({ message: "No thought found with this ID!" });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a thought by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) {
      return res
        .status(404)
        .json({ message: "No thought found with this ID!" });
    }
    await User.findOneAndUpdate(
      { thoughts: req.params.id },
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );
    res.json({ message: "Thought deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a reaction to a thought
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this ID!" });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove a reaction from a thought
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res
        .status(404)
        .json({ message: "No thought found with this ID!" });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
