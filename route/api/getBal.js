const express = require("express");
const router = express.Router();
const getCustomerByEmail = require("../../controllers/findUserBalFromPaystack");

router.get("/", getCustomerByEmail);

module.exports = router;