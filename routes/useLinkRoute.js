const express = require("express");
const moduleScaffoldingUseLink = require("../controllers/useLinkRouteController");
const lib = require("../lib/lib");

const router = express.Router();

router.get("/:customName", moduleScaffoldingUseLink.get);

module.exports = router;
