const express = require("express");
const router = express.Router();
const generateVirtualAccount = require("../../controllers/generateVirtualAcc");

router.post("/", generateVirtualAccount);
module.exports = router;
