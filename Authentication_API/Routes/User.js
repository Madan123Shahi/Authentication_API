const userCtrl = require("../controllers/User");
const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/api/v1/register", userCtrl.register);
router.post("/api/v1/login", userCtrl.logIn);
router.get("/api/v1/profile", isAuthenticated, userCtrl.profile);

module.exports = router;
