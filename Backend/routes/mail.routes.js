const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mail.controller");
const { body } = require("express-validator");
const { authUser, authCaptain } = require("../middlewares/auth.middleware");

router.get("/verify-user-email", authUser, mailController.sendVerificationEmail);
router.get("/verify-captain-email", authCaptain, mailController.sendVerificationEmail);

const rateLimit = require("express-rate-limit");
const resetPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many password reset requests. Please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/:userType/reset-password", resetPasswordLimiter, mailController.forgotPassword);


module.exports = router;
