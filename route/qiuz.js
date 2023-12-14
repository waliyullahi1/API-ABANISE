const express = require("express");
const router = express.Router();
const quiz = require("../controllers/quiz");

router.post("/", quiz.registerNumberForQUiz);
router.post("/gift", quiz.givePhoneGift);

module.exports = router;