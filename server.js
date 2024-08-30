const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const thoughtRoutes = require("./routes/thoughtRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);

mongoose.connect("mongodb://localhost:27017/socialNetworkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
