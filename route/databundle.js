const express = require("express");
const router = express.Router();
const datebundle = require("../controllers/databundle");

router.post("/airtime", datebundle.airtimeForAllNewtwork);

router.post("/data", datebundle.dataBundleForAllNewtwork);

module.exports = router;