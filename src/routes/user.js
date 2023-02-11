const express = require("express");
const router = express.Router();

const { GetDetailUser, UpdateProfile, DeleteAccount, UpdatePassword } = require(`${__dirname}/../controllers/userController`);
const { isAuthorized } = require('../middleware/isAuthorized');
const { Helpers } = require("../utils/helpers");

router.get("/profile", isAuthorized, GetDetailUser);
router.patch("/update-profile", isAuthorized, UpdateProfile);
router.patch("/delete-account", isAuthorized, DeleteAccount);
router.patch("/update-password", isAuthorized, UpdatePassword);

module.exports = router;

