const express = require("express");
const router = express.Router();
const { RegisterUser, LoginUser, RefreshAccessToken,ForgotPassword } = require(`../controllers/authController`);
const { isAuthorized } = require('../../../middleware/isAuthorized');
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/refresh-access-token", RefreshAccessToken);
router.patch("/forgot-password", ForgotPassword);

module.exports = router;