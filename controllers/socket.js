const gameSchema = require("../models/gameSchema");

module.exports = (io) => {
  try {
    io.on("connection", async (socket) => {
      console.log("user connected");
      // socket.on("joinRoom", async ({ id, email }) => {
      //   socket.join(id);
      //   console.log(id, email);
      //   const game = await gameSchema.findById(id);
      //   console.log(game.users, email);
      //   if (!game) {
      //     return res.status(404).json({
      //       message: "Game not found",
      //     });
      //   }
      //   if (game.users.includes(email)) {
      //     console.log("hello");
      //     socket.to(id).emit("getRoomData", {
      //       message: "Game found",
      //       game,
      //     });
      //   }
      // });
      socket.on("userMove", async (data) => {
        const newData = data.map((row, index) => {
          return row.map((col) => {
            return {
              move: col.move ? (col.move === "X" ? "O" : "X") : null,
              line: col.line,
              id: col.id,
            };
          });
        });
        socket.broadcast.emit("nextMove", {
          newBoard: newData,
        });
        // gameSchema
        //   .findOneAndUpdate(
        //     { _id: room },
        //     { $set: { gameState: newData } },
        //     { new: true }
        //   )
        //   .then((res) => {
        //     console.log(res.gameState);
        //   });
      });
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
