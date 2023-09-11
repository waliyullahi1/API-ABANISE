const express = require("express");
const router = express.Router();
const saveTransaction = require("../controllers/transaction");

router.post("/", saveTransaction);
module.exports = router;
