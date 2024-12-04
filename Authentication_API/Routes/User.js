const userCtrl = require("../controllers/User");
const express = require("express");
const router = express.Router();

router.post("/api/v1/register", userCtrl.register);
router.post("/api/v1/login", userCtrl.logIn);

module.exports = router;
