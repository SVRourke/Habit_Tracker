var express = require("express");
var router = express.Router();

const users = require("./users");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Habit Tracker");
});

router.use("/users", users);

// TODO: auth
// TODO: habits
// TODO: logs

module.exports = router;
