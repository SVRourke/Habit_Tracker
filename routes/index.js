var express = require("express");
var router = express.Router();

const users = require("./users");
const habits = require("./habits");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Habit Tracker");
});

router.use("/users", users);
router.use("/habits", habits);

// TODO: auth
// TODO: habits
// TODO: logs

module.exports = router;
