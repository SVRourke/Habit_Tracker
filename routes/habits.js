var express = require("express");
var router = express.Router({ mergeParams: true });


const controller = require("../controllers/habits");

// router.get("/", (req, res) => res.send("Hello Habits"));
router.get("/", controller.index);
router.post("/", controller.create);

router
  .route("/:habitId")
  .get(controller.show)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;
