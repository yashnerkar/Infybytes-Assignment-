const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    games: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const users = mongoose.model("User", userSchema);

module.exports = users;
