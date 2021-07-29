const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/invoices", authController.signup);
router.get("/invoice/:id", authController.login);

module.exports = router;
