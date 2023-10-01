const express = require("express");
const router = express.Router();
const verify = require("../../controllers/verify");

router.post("/", verify);

module.exports = router;
