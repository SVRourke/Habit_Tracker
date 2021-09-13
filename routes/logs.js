const express = require("express");
const router = express.Router({ mergeParams: true });

const controller = require("../controllers/logs");

router.get("/", controller.index);
router.post("/", controller.create);

module.exports = router;
