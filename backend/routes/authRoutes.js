const { createUser, getUser } = require("../controllers/authController.js");
const express = require("express");

const router = express.Router();

router.post("/login", getUser);
router.post("/signup", createUser);

module.exports = router;
