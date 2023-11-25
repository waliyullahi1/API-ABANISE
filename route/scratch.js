const express = require("express");
const router = express.Router();
const scratchCard = require("../controllers/scratchCard");

router.get("/", scratchCard);

module.exports = router;