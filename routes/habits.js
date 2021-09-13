var express = require("express");
var router = express.Router({ mergeParams: true });

const controller = require("../controllers/habits");
const logsRouter = require("./logs");
// router.get("/", (req, res) => res.send("Hello Habits"));
router.get("/", controller.index);
router.post("/", controller.create);

router
  .route("/:habitId")
  .get(controller.show)
  .patch(controller.update)
  .delete(controller.delete);

router.use("/:habitId/logs", logsRouter);

module.exports = router;
