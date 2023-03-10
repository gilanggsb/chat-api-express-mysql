const BaseResponse = require("../../../utils/baseResponse");
const { Helpers } = require("../../../utils/helpers");
const { RegisterUserService, LoginUserService, RefreshAccessTokenService,ForgotPasswordService } = require(`../services/authService`)

const RegisterUser = async (req, res) => {
    try {
        Helpers.print("AuthController RegisterUser body : ", req.body,);
        const user = await RegisterUserService(req.body);
        Helpers.print("AuthController RegisterUser result : ", user);
        return BaseResponse.sendResponse(user, res);
    } catch (error) {
        Helpers.print("AuthController RegisterUser : ", error, true);
        return BaseResponse.sendErrorResponse(error, res);
    }
};
const LoginUser = async (req, res) => {
    try {
        Helpers.print("AuthController LoginUser body : ", req.body);
        const user = await LoginUserService(req.body);
        Helpers.print("AuthController LoginUser result : ", user);
        return BaseResponse.sendResponse(user, res);
    } catch (error) {
        Helpers.print("AuthController LoginUser : ", error, true);
        return BaseResponse.sendErrorResponse(error, res);
    }
};

const RefreshAccessToken = async (req, res) => {
    try {
        Helpers.print("AuthController RefreshAccessToken body : ", req.body);
        const token = await RefreshAccessTokenService(req.body.accessToken);
        Helpers.print("AuthController RefreshAccessToken result : ", token);
        return BaseResponse.sendResponse(token, res);
    } catch (error) {
        Helpers.print("AuthController RefreshAccessToken : ", error, true);
        return BaseResponse.sendErrorResponse(error, res);
    }
}
const ForgotPassword = async (req, res) => {
    try {
        Helpers.print("AuthController ForgotPassword body : ", req.body);
        const token = await ForgotPasswordService(req.body);
        Helpers.print("AuthController ForgotPassword result : ", token);
        return BaseResponse.sendResponse(token, res);
    } catch (error) {
        Helpers.print("AuthController ForgotPassword : ", error, true);
        return BaseResponse.sendErrorResponse(error, res);
    }
}


module.exports = {
    RegisterUser,
    LoginUser,
    RefreshAccessToken,
    ForgotPassword,
}
