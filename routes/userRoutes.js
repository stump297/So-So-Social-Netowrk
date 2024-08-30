const router = require("express").Router();
const User = require("../models/User");
// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("thoughts")
      .populate("friends");
    if (!user) {
      return res.status(404).json({ message: "No user found with this ID!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "No user found with this ID!" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "No user found with this ID!" });
    }
    await Thought.deleteMany({ username: deletedUser.username });
    res.json({ message: "User and associated thoughts deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a friend to a user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).populate("friends");
    if (!user) {
      return res.status(404).json({ message: "No user found with this ID!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove a friend from a user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).populate("friends");
    if (!user) {
      return res.status(404).json({ message: "No user found with this ID!" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
