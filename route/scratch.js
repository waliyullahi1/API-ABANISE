const express = require("express");
const router = express.Router();
const scratchCard = require("../controllers/scratchCard");

router.post("/", scratchCard);

module.exports = router;