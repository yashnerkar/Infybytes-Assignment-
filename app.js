require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const game = require("./models/gameSchema");
const nodemailer = require("nodemailer");
// const { saveGame } = require("./controllers/user.controller");
const { SocketAddress } = require("net");
const { update } = require("./models/gameSchema");
const url = process.env.DB_URL;
mongoose.set("strictQuery", false);
const socket = require("./controllers/socket.js");
const routes = require("./routes/routes");

const server = http.createServer(app);
const io = new Server(server, {
  cors: true,
});
socket(io);
app.use(express.json());
app.use(cors());
app.use("/", routes);

try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.listen(8000, () => {
  console.log("listening on port:8000");
});
