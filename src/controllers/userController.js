const BaseResponse = require("../models/baseResponse");
const { Helpers } = require("../utils/helpers");


const {
  GetDetailUserService,
  UpdateProfileService,
  DeleteAccountService,
  UpdatePasswordService,
} = require("../services/userService");

const GetDetailUser = async (req, res) => {
  try {
    Helpers.print("UserController GetDetailUser body : ", req.body);
    const user = await GetDetailUserService(req.query.userId);
    Helpers.print("UserController GetDetailUser result : ", user);
    return BaseResponse.sendResponse(user, res);
  } catch (error) {
    Helpers.print("UserController GetDetailUser", error.message, true);
    return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
  }
};

const UpdateProfile = async (req, res) => {
  try {
    Helpers.print("UserController UpdateProfile body : ", req.body);
    const user = await UpdateProfileService(req.body);
    Helpers.print("UserController UpdateProfile result : ", user);
    return BaseResponse.sendResponse(user, res);
  } catch (error) {
    Helpers.print("UserController UpdateProfile", error.message, true);
    return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
  }
};

const DeleteAccount = async (req, res) => {
  try {
    Helpers.print("UserController DeleteAccount body : ", req.body);
    const user = await DeleteAccountService(req.body.userId);
    Helpers.print("UserController DeleteAccount result : ", user);
    return BaseResponse.sendResponse(user, res);
  } catch (error) {
    Helpers.print("UserController DeleteAccount", error.message, true);
    return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
  }
};
const UpdatePassword = async (req, res) => {
  try {
    Helpers.print("UserController UpdatePassword body : ", req.body);
    const user = await UpdatePasswordService(req.body);
    Helpers.print("UserController UpdatePassword result : ", user);
    return BaseResponse.sendResponse(user, res);
  } catch (error) {
    Helpers.print("UserController UpdatePassword", error.message, true);
    return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
  }
};

module.exports = {
  GetDetailUser,
  UpdateProfileService,
  UpdateProfile,
  DeleteAccount,
  UpdatePassword,
};
