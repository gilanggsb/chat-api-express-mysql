const { Helpers } = require("../utils/helpers");
const BaseResponse = require("../models/BaseResponse");

const isAuthorized = (req, res, next) => {
    //extract token from header;
    const token = Helpers.extractToken(req);
    //generate error response
    const errorResponse = BaseResponse.generateResponse(401, "Anda tidak punya akses untuk halaman ini", "");
    //check if token is empty
    if (!token) return BaseResponse.sendResponse(errorResponse, res);
    try {
        req.user = Helpers.decodeToken(token);
        //check if token is not valid
        if (req.user.errorMessage != undefined) {
            errorResponse.statusCode = 400
            errorResponse.message = req.user.errorMessage;
            return BaseResponse.sendResponse(errorResponse, res);
        }
        next();
    } catch (error) {
        errorResponse.statusCode == 400;
        errorResponse.message = error.message == "invalid token" ? "Token tidak valid" : "Sesi anda telah habis. Silahkan login kembali";
        return BaseResponse.sendResponse(errorResponse, res);
    }
};

module.exports = {
    isAuthorized,
}
