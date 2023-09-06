const express = require("express");
const route = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

route.get("/", verifyJWT);

module.exports = route;
