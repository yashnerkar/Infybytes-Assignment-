const mongoose = require("mongoose");
const gameSchema = require("../models/gameSchema");
const userSchema = require("../models/userSchema");
const nodemailer = require("nodemailer");

exports.addUsers = async (req, res) => {
  const { name, username, email, password, games } = req.body;
  try {
    const user = new userSchema({
      name,
      username,
      email,
      password,
      games,
    });
    // const gameUser = new gameSchema({
    //   host: email,
    // });
    // await gameUser.save();
    console.log("user", user);
    await user.save();
    res.status(201).json({
      message: "User added successfully",
      userData: {
        username,
        email,
        games,
      },
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await userSchema.findOne({ username });
  if (user) {
    if (user.password === password) {
      res.status(200).json({
        message: "Login Successful",
        user,
      });
    } else {
      res.status(401).json({
        message: "Invalid Password",
      });
    }
  }
};

exports.saveGame = async (req, res) => {
  const { username, email, gameId, gameData, gameStatus, winner } = req.body;
  try {
    const game = new gameSchema({
      username,
      email,
      gameId,
      gameData,
      gameStatus,
      winner,
    });
    await game.save();
    res.status(201).json({
      message: "Game saved successfully",
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.startGame = async (req, res) => {
  const { email, userData } = req.body;
  console.log(userData);
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "yashnerkar512@gmail.com",
      pass: "tcrjlegwksfcrtxz",
    },
  });
  const opponent = await userSchema.findOne({ email });
  const host = await userSchema.findOne({ email: userData.email });
  // console.log(Id);
  if (!opponent) {
    return res.status(404).json({
      message: "User not found, Register opponent first",
    });
  }
  const mailOptions = {
    from: '"Fred Foo ?" <yashnerkar512@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ?", // plaintext body
    html: "<b>Hello world ?</b>", // html body
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
  const game = await new gameSchema({
    host: userData.email,
    opponent: email,
    users: [userData.email, email],
  });
  await game.save();
  console.log(game);
  res.status(200).json({
    message: "Email sent",
    gameId: game._id,
  });
};

exports.getGameData = async (req, res) => {
  const { gameId, email } = req.body;
  const game = await gameSchema.findOneById(gameId);
  if (!game) {
    return res.status(404).json({
      message: "Game not found",
    });
  }
  if (game.users.includes(email)) {
    return res.status(200).json({
      message: "Game found",
      game,
    });
  }

  // const game = await gameSchema;
};
