const mongoose = require("mongoose");
const User = require("./models/User");
const Thought = require("./models/Thought");

mongoose.connect("mongodb://localhost:27017/socialNetworkDB", {});

const seedUsers = [
  {
    username: "john_doe",
    email: "john@example.com",
  },
  {
    username: "jane_doe",
    email: "jane@example.com",
  },
  {
    username: "sam_smith",
    email: "sam@example.com",
  },
];

const seedThoughts = [
  {
    thoughtText: "This is my first thought!",
    username: "john_doe",
  },
  {
    thoughtText: "Hello world!",
    username: "jane_doe",
  },
  {
    thoughtText: "I love coding!",
    username: "sam_smith",
  },
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany(seedUsers);
    const thoughts = await Thought.insertMany(seedThoughts);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
