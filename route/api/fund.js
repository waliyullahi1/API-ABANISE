
const express = require("express");
const router = express.Router();
const getCustomerByAccountNumber = require("../../controllers/fundHistory")

router.get("/", getCustomerByAccountNumber);

module.exports = router;
