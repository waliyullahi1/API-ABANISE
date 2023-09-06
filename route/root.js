const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..",  "views", "index.html"));
});

router.get("/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "test.html"));
});

router.get("/redirect(.html)?", (req, res) => {
  res.redirect(301, "/test.html");
});

module.exports = router