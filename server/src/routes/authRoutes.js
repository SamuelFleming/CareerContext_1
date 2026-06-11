// server/src/routes/authRoutes.js

const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");

const mediaTypeValidator = require("../middleware/mediaTypeValidator");
const authenticateWithJwt = require("../middleware/auth/authenticateWithJwt");
const {
    registerValidation,
    loginValidation,
} = require("../middleware/auth/authValidators");

router.post("/register", mediaTypeValidator, registerValidation, controller.register);
router.post("/login", mediaTypeValidator, loginValidation, controller.login);
router.get("/me", authenticateWithJwt, controller.getMe);
//router.post("/logout", authenticateWithJwt, controller.logout);

module.exports = router;