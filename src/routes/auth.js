const express = require("express");
const router = express.Router();
const { RegisterUser, LoginUser, RefreshAccessToken } = require(`${__dirname}/../controllers/authController`);
const { isAuthorized } = require('../middleware/isAuthorized');
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/refresh-access-token", RefreshAccessToken);

module.exports = router;