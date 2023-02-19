
const { Helpers } = require("../../../utils/helpers");
const { query } = require("../../../database/connection");
const BaseResponse = require("../../../utils/baseResponse");
const UserModel = require("../../user/models/userModel");
const jwt = require('jsonwebtoken');
const QueryHelpers = require("../../../utils/queryHelpers");


const AddFriendService = async (data) => {
    try {
        const user = await QueryHelpers.isUserExistByUsername(data.friendUsername);
        //check if user not exist;
        if (Helpers.isNull(user)) {
            return BaseResponse.generateResponse(400, `${data.friendUsername} tidak ditemukan`, "");
        }
        const friends = await query(`SELECT * FROM friends WHERE user_id = '${data.userId}' AND friend_id = '${user.uuid}'`);
        //check if friend is already exist
        if (!Helpers.isNull(friends)) {
            return BaseResponse.generateResponse(400, `${data.friendUsername} telah terdaftar`, "");
        }
        //insert friend
        await query(`INSERT INTO friends (user_id,friend_id) VALUES ('${data.userId}','${user.uuid}')`);
        return BaseResponse.generateResponse(200, `${data.friendUsername} berhasil ditambahkan sebagai teman`, "");
    } catch (error) {
        Helpers.print("friendsService addFriend", error.message, true);
        return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
    }
}
const FindAllMyFriendsService = async (data) => {
    try {
        const user = await QueryHelpers.isUserExistByUserID(data.userId);
        //check if user not exist;
        if (Helpers.isNull(user)) {
            return BaseResponse.generateResponse(400, `User tidak ditemukan`, "");
        }
        //get list friend
        let friends = await query(`SELECT f.is_removed,u.* FROM friends f INNER JOIN users u ON u.uuid= f.friend_id WHERE f.user_id = '${data.userId}'`);
        //mapping friend to usermodel
        friends = friends.flatMap((element) => {
            //cek is friend removed
            if (element.is_removed == 1) return [];
            //return user model
            return new UserModel(element);
        });
        return BaseResponse.generateResponse(200, `Success`, friends);
    } catch (error) {
        Helpers.print("friendsService findAllMyFriends", error.message, true);
        return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
    }
}
const RemoveFriendService = async (data) => {
    try {
        const user = await QueryHelpers.isUserExistByUserID(data.friendId);
        //check if user not exist;
        if (Helpers.isNull(user)) {
            return BaseResponse.generateResponse(400, `User tidak ditemukan`, "");
        }
        const myFriend = await query(`SELECT * FROM friends WHERE friend_id = '${data.friendId}' AND user_id = '${data.userId}'`)
        if (Helpers.isNull(myFriend)) {
            return BaseResponse.generateResponse(400, `${user.name} tidak ditemukan`, "");
        }
        if (myFriend[0].is_removed == 1) {
            return BaseResponse.generateResponse(400, `${user.name} sudah terhapus`, "");
        }
        //get list friend
        await query(`UPDATE friends SET is_removed = true WHERE user_id = '${data.userId}' AND friend_id = '${data.friendId}'`);
        return BaseResponse.generateResponse(200, `Success`, "");
    } catch (error) {
        Helpers.print("friendsService removeFriend", error.message, true);
        return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
    }
}
const FindMyFriendService = async (data) => {
    try {
        const friend = await QueryHelpers.isUserExistByUsername(data.friendUsername);
        //check if user not exist;
        if (Helpers.isNull(friend)) {
            return BaseResponse.generateResponse(400, `${data.friendUsername} tidak ada`, "");
        }
        //get list friend
        let friends = await query(`SELECT f.is_removed,u.* FROM friends f INNER JOIN users u ON u.uuid = f.friend_id WHERE f.user_id = '${data.userId}' AND f.friend_id = '${friend.uuid}'`);
        //mapping friend to usermodel
        if(Helpers.isNull(friends,0)){
            return BaseResponse.generateResponse(400, `${data.friendUsername} tidak ditemukan`, "");
        }
        return BaseResponse.generateResponse(200, `Success`, new UserModel(friends[0]));
    } catch (error) {
        Helpers.print("friendsService findMyFriend", error.message, true);
        return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
    }
}

module.exports = {
    AddFriendService,
    RemoveFriendService,
    FindAllMyFriendsService,
    FindMyFriendService,
}