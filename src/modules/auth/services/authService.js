
const { Helpers } = require("../../../utils/helpers");
const { query } = require("../../../database/connection");
const BaseResponse = require("../../../utils/baseResponse");
const UserModel = require("../../user/models/userModel");
const jwt = require('jsonwebtoken');

const RegisterUserService = async (data) => {
    try {
        //parse phone
        data.phone = Helpers.parsePhone(data.phone);
        //hash password
        data.password = Helpers.hashPassword(data.password);
        //generate uuid
        data.uuid = Helpers.generateUUID();
        const errorMessage = Helpers.validateRegisterForm(data);
        //check if is form not valid;
        if (errorMessage != "") {
            Helpers.print("AuthService registerUser : ", errorMessage);
            return BaseResponse.generateResponse(400, errorMessage, "");
        }
        const user = await query(`SELECT * FROM users WHERE email = '${data.email}' OR phone ='${data.phone}'`,);
        //check if user is already registered
        if (user.length != 0) {
            return BaseResponse.generateResponse(400, "Email atau nomor telepon telah terdaftar", "");
        }
        //insert user
        await query(`INSERT INTO users (uuid, username, name, email, password,gender,phone,address,city,roles) VALUES ('${data.uuid}','${data.username}','${data.name}','${data.email}', '${data.password}','${data.gender.toUpperCase()}','${data.phone}','${data.address}','${data.city}','${data.roles}')`);
        return BaseResponse.generateResponse(200, "Registrasi berhasil", "");
    } catch (error) {
        Helpers.print("AuthService registerUser", error.message, true);
        return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
    }
}

const LoginUserService = async (data) => {
    try {
        //check if email is valid
        if (!Helpers.isValidEmail(data.email)) {
            return BaseResponse.generateResponse(400, "Email tidak valid", "");
        }
        //hash password
        hashedPassword = Helpers.hashPassword(data.password);
        const user = await query(`SELECT * FROM users WHERE email = '${data.email}' AND password='${hashedPassword}'`);
        //check if email and password is correct
        if (user.length == 0) {
            return BaseResponse.generateResponse(400, "Email atau password salah", "");
        }
        //check if user is already deleted
        const userModel = new UserModel(user[0]);
        if (userModel.getIsDeleted() == 1) {
            return BaseResponse.generateResponse(400, "Akun telah dihapus", "");
        }
        //generate token
        userModel.accessToken = generateAccessToken(userModel);
        userModel.refreshToken = generateRefreshToken(userModel);
        return BaseResponse.generateResponse(200, "Login berhasil", userModel);

    } catch (error) {
        Helpers.print("AuthService registerUser", error.message, true);
        return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
    }
}

const RefreshAccessTokenService = (data) => {
    try {
        //decode token
        const decodedToken = Helpers.decodeToken(data);
        Helpers.print("AuthService generateRefreshToken", decodedToken);
        //check if token is not valid
        if (decodedToken.errorMessage != undefined) {
            return BaseResponse.generateResponse(400, decodedToken.errorMessage, "");
        }
        //return new token
        const newToken = generateAccessToken(decodedToken);
        return BaseResponse.generateResponse(200, "Success refresh access token", { "accessToken": newToken });
    } catch (error) {
        Helpers.print("AuthService generateRefreshToken", error.message, true);
        return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
    }
}

const generateAccessToken = (data) => {
    try {
        //generate body token
        const user = Helpers.generateTokenBody(data)
        //generate token
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        Helpers.print("AuthService generateAccessToken", token);
        return token;
    } catch (error) {
        Helpers.print("AuthService generateAccessToken", error.message, true);
        return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
    }
}

const generateRefreshToken = (data) => {
    try {
        //generate body token
        const user = Helpers.generateTokenBody(data)
        //generate token
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
        Helpers.print("AuthService generateAccessToken", token);
        return token;
    } catch (error) {
        Helpers.print("AuthService generateAccessToken", error.message, true);
        return BaseResponse.generateResponse(503, "Terjadi Kesalahan", "");
    }
}

module.exports = {
    RegisterUserService,
    LoginUserService,
    generateAccessToken,
    RefreshAccessTokenService,
}