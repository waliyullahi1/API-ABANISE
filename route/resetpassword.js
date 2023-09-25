const express = require("express");
const router = express.Router();
const resetpassword = require("../controllers/resetPassword");

router.post("/requestPasswordReset", resetpassword.requestPasswordReset);
router.post("/", resetpassword.resetPassword);

module.exports = router;
