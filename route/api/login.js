const express = require("express");
const router = express.Router();
const handleLoginController = require("../../controllers/handleLoginControl");

router.post("/", handleLoginController.handleLogin);

module.exports = router;
