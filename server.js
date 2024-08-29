const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/socialNetworkDB", {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
