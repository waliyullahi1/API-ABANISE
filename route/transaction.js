const express = require("express");
const router = express.Router();
const transactionHistory = require("../controllers/transactionHistory");

router.get("/", transactionHistory);
module.exports = router;
