const express = require("express");
const router = express.Router();
const { AddFriend, FindAllMyFriends, RemoveFriend, FindMyFriend } = require(`../controllers/friendsController`);
const { isAuthorized } = require('../../../middleware/isAuthorized');
router.post("/add-friend", isAuthorized, AddFriend);
router.get("/my-friends", isAuthorized, FindAllMyFriends);
router.delete("/remove-friend", isAuthorized, RemoveFriend);
router.post("/find-friend", isAuthorized, FindMyFriend);

module.exports = router;