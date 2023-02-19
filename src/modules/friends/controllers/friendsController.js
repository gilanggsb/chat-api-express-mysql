const BaseResponse = require("../../../utils/baseResponse");
const { Helpers } = require("../../../utils/helpers");
const { AddFriendService, FindAllMyFriendsService, RemoveFriendService, FindMyFriendService } = require(`../services/friendsService`)

const AddFriend = async (req, res) => {
    try {
        Helpers.print("FriendsController AddFriend body : ", req.body,);
        const user = await AddFriendService(req.body);
        Helpers.print("FriendsController AddFriend result : ", user);
        return BaseResponse.sendResponse(user, res);
    } catch (error) {
        Helpers.print("FriendsController AddFriend : ", error, true);
        return BaseResponse.sendErrorResponse(error, res);
    }
};
const FindAllMyFriends = async (req, res) => {
    try {
        Helpers.print("FriendsController FindAllMyFriends query : ", req.query,);
        const user = await FindAllMyFriendsService(req.query);
        Helpers.print("FriendsController FindAllMyFriends result : ", user);
        return BaseResponse.sendResponse(user, res);
    } catch (error) {
        Helpers.print("FriendsController FindAllMyFriends : ", error, true);
        return BaseResponse.sendErrorResponse(error, res);
    }
};
const RemoveFriend = async (req, res) => {
    try {
        Helpers.print("FriendsController RemoveFriend body : ", req.body,);
        const user = await RemoveFriendService(req.body);
        Helpers.print("FriendsController RemoveFriend result : ", user);
        return BaseResponse.sendResponse(user, res);
    } catch (error) {
        Helpers.print("FriendsController RemoveFriend : ", error, true);
        return BaseResponse.sendErrorResponse(error, res);
    }
};
const FindMyFriend = async (req, res) => {
    try {
        Helpers.print("FriendsController FindMyFriend body : ", req.body,);
        const user = await FindMyFriendService(req.body);
        Helpers.print("FriendsController FindMyFriend result : ", user);
        return BaseResponse.sendResponse(user, res);
    } catch (error) {
        Helpers.print("FriendsController FindMyFriend : ", error, true);
        return BaseResponse.sendErrorResponse(error, res);
    }
};
module.exports = {
    AddFriend,
    FindAllMyFriends,
    RemoveFriend,
    FindMyFriend,
}
