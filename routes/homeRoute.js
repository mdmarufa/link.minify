const express = require("express");
const moduleScaffoldingHome = require("../controllers/homeRouteController");
const lib = require("../lib/lib");

const router = express.Router();

router.get("/", lib.checkAuthentication , moduleScaffoldingHome.get);

module.exports = router;
