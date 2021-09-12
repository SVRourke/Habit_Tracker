var express = require("express");
var router = express.Router();

const habits = require("./habits");
const controller = require("../controllers/users");

router.get("/", controller.index);
router.post("/", controller.create);

router
  .route("/:userId")
  .get(controller.show)
  .patch(controller.update)
  .delete(controller.delete);

router.use("/:userId/habits", habits);
module.exports = router;
