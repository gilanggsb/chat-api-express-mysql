const { query } = require("../../../database/connection");
const { Helpers } = require("../../../utils/helpers");
const BaseResponse = require("../../../utils/baseResponse");
const UserModel = require("../models/userModel");
const QueryHelpers = require("../../../utils/queryHelpers");


// Returns detail profile
const GetDetailUserService = async (userId) => {
  try {
    const user = await QueryHelpers.isUserExist(userId);
    //check if user is not exist
    if (Helpers.isNull(user)) {
      return BaseResponse.generateResponse(400, "User tidak ditemukan", "");
    }
    //return detail user
    return BaseResponse.generateResponse(200, "Success get detail user", new UserModel(user));
  } catch (error) {
    Helpers.print("UserService DetailProfile", error.message, true);
    return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
  }
};
// Returns detail profile
const UpdateProfileService = async (data) => {
  try {
    //uppercase gender
    data.gender = data.gender.toUpperCase();
    //parse phone
    data.phone = Helpers.parsePhone(data.phone);
    const user = await QueryHelpers.isUserExist(data.userId);
    //check if user not exist
    if (Helpers.isNull(user)) {
      return BaseResponse.generateResponse(400, "User tidak ditemukan, gagal update profile", "");
    }
    //success update user
    await query(`UPDATE users SET name = '${data.name}', gender = '${data.gender}', phone = '${data.phone}',address = '${data.address}', city = '${data.city}' WHERE uuid = '${data.userId}'`);
    return BaseResponse.generateResponse(200, "Update profile success", "");
  } catch (error) {
    Helpers.print("UserService UpdateProfile", error.message, true);
    return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
  }
};


// delete account
const DeleteAccountService = async (userId) => {
  try {
    const user = await QueryHelpers.isUserExist(userId);
    //check if user is exist;
    if (Helpers.isNull(user)) {
      return BaseResponse.generateResponse(400, "User tidak ditemukan, gagal hapus akun", "");
    }
    //success delete account;
    await query(`UPDATE users SET is_deleted = 1 WHERE uuid = '${userId}'`);
    return BaseResponse.generateResponse(200, "Berhasil hapus akun", "");
  } catch (error) {
    Helpers.print("UserService DeleteAccount", error.message, true);
    return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
  }
};

const UpdatePasswordService = async (data) => {
  try {
    const user = await QueryHelpers.isUserExist(data.userId);
    //check if user not exist;
    if (Helpers.isNull(user)) {
      return BaseResponse.generateResponse(400, "User tidak ditemukan, gagal update password", "");
    }
    //hash password;
    data.password = Helpers.hashPassword(data.password);
    const isSamePassword = await query(`Select * FROM users WHERE uuid = '${data.userId}' and password = '${data.password}'`);
    //check if password is same;
    if (isSamePassword.length !== 0) {
      return BaseResponse.generateResponse(400, "Password tidak boleh sama", "");
    }
    //success update password;
    await query(`UPDATE users SET password = '${data.password}' WHERE uuid = '${data.userId}'`);
    return BaseResponse.generateResponse(200, "Berhasil update password", "");
  } catch (error) {
    Helpers.print("UserService UpdatePassword", error.message, true);
    return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
  }
}

module.exports = {
  GetDetailUserService,
  DeleteAccountService,
  UpdateProfileService,
  UpdatePasswordService,
};
