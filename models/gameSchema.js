const mongoose = require("mongoose");
const gameSchema = mongoose.Schema(
  {
    users: [],
    host: {
      type: String,
    },
    opponent: {
      type: String,
    },
    board: {
      type: Array,
    },
    status: {
      isCompleted: {
        type: Boolean,
      },
      winner: {
        type: String,
      },
    },
    activePlayer: {
      type: String,
    },
    winner: {
      type: String,
    },
  },
  { timestamps: true }
);

const game = mongoose.model("Game", gameSchema);
module.exports = game;
