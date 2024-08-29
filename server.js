const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const thoughtRoutes = require("./routes/thoughtRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/socialNetworkDB", {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
