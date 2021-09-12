var express = require("express");
var router = express.Router();

// const habits = require("./habits");

const controller = require("../controllers/habits");

// router.get("/", (req, res) => res.send("Hello Habits"));
// router.get("/", controller.index);
router.post("/", controller.create);

// router
//   .route("/:userId")
//   .get(controller.show)
//   .patch(controller.update)
//   .delete(controller.delete);
//   .use("/habits", habits)

module.exports = router;
