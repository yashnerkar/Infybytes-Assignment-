const router = require("express").Router();
const {
  addUsers,
  loginUser,
  startGame,
  getGameData,
} = require("../controllers/user.controller");

router.post("/registeruser", addUsers);
router.post("/loginuser", loginUser);
router.post("/join", startGame);
router.post("/join/:id", getGameData);

module.exports = router;
