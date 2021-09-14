const express = require("express");
const router = express.Router({ mergeParams: true });

const controller = require("../controllers/logs");

router.get("/", controller.index);
router.post("/", controller.create);

router.route("/:logId").delete(controller.destroy);

module.exports = router;
