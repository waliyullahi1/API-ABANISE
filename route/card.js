const express = require("express");
const router = express.Router();
const savePin = require("../controllers/savePin");
const sellingcardPin = require('../controllers/cardSelling')

router.post("/save", savePin);
router.get("/sell", sellingcardPin)

module.exports = router;
