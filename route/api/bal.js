
const express = require("express");
const router = express.Router();
const getCustomerByAccountNumber = require("../../controllers/findUserBalFromPaystack");

router.get("/", getCustomerByAccountNumber);

module.exports = router;
