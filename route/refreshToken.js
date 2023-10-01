const express = require("express");
const router = express.Router();
const handleLoginController = require("../controllers/refreshTokenControl");

router.get("/",  handleLoginController.handleLogin);

module.exports = router;
