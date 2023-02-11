require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');


class Helpers {
    static getOffset(currentPage = 1, listPerPage) {
        return (currentPage - 1) * [listPerPage];
    }

    static emptyOrRows(rows) {
        if (!rows) {
            return [];
        }
        return rows;
    }

    static validateRegisterForm = (data) => {
        if (!Helpers.isValidEmail(data.email)) {
            return "Email tidak valid";
        }

        if (!Helpers.isValidPhone(data.phone)) {
            return "Nomor telepon tidak valid";
        }

        if (!Helpers.isValidGender(data.gender)) {
            return "Jenis kelamin tidak valid";
        }

        if (Helpers.isNull(data.name)) {
            return "Nama tidak boleh kosong";
        }

        if (Helpers.isNull(data.address)) {
            return "Alamat tidak boleh kosong";
        }

        if (Helpers.isNull(data.city)) {
            return "Kota tidak boleh kosong";
        }

        if (Helpers.isNull(data.roles)) {
            return "Roles tidak boleh kosong";
        }


        return "";
    }

    static print(tag, data, isError = false) {
        console.log(`===================================================`, "");
        console.log(`CHATLOG ${isError ? "ERROR" : ''} ${tag || ''} ${data != undefined ? JSON.stringify(data) : ''}`);
    }

    static isValidEmail(email) {
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email !== '' && email.match(emailFormat)) { return true; }
        return false;
    }

    static isValidPhone(phone) {
        var phoneFormat = /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/;
        if (phone.length <= 11 && phone.length >= 15) return false;
        if (phone.charAt(0) != "8") return false;
        if (!phone.match(phoneFormat)) return false;
        return true;

    }

    static isDigitsOnly(number) {
        var digitFormat = /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/;
        if (!number.match(digitFormat)) return false;
        return true;
    }

    static isValidGender(gender) {
        var lowerCaseGender = gender.toLowerCase();
        if (lowerCaseGender == "m" || lowerCaseGender == "f") return true;
        return false;
    }

    static isNull(data, compareWith = "") {
        if (data == null || data == undefined) return true;
        if (data == compareWith) return true;
        return false;
    }

    static hashPassword(password) {
        const addSalt = `${process.env.SALT_KEY}${password}${process.env.SALT_KEY}`;
        const result = md5(addSalt);
        this.print("Hash Password Plain: ", `${addSalt}`);
        this.print("Hash Password Result: ", `${result}`);
        return md5(addSalt);
    }

    static parsePhone(phone) {
        const firstNumber = phone.substring(0, 1);
        if (firstNumber == "0") {
            return phone.substring(1);
        }
        if (firstNumber == "+") {
            return phone.substring(3);
        }
        return phone;
    }

    static parseErrorToken(error) {
        if (error.message.includes("expired")) {
            return { "errorMessage": "Sesi anda telah habis. Silahkan login kembali" };
        }

        if (error.message.includes("malform")) {
            return { "errorMessage": "Token tidak valid" };
        }
        return { "errorMessage": error.message };
    }

    static decodeToken(token) {
        try {
            this.print("Decode Token : ", token);
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) return Helpers.parseErrorToken(err);
                return decoded;
            });
            this.print("Decode Token Result : ", decodedToken);
            return decodedToken;
        } catch (error) {
            this.print("Decode Token : ", error.message, true);
            throw error;
        }
    }

    static extractToken = (req) => {
        this.print("Extract Token  : ", req.headers.authorization || req.query || req.query.token);
        let token = null;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            token = req.query.token;
        }
        this.print("Extract Token Result : ", token);
        return token;
    }

    static generateUUID = () => {
        const uuidResult = v4();
        this.print("Generate UUID Result : ", uuidResult);
        return uuidResult;
    }

    static generateTokenBody = (data) => {
        try {
            const tokenBody = {
                "userId": data.userId,
                "name": data.name,
                "email": data.email,
            };
            return tokenBody;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = {
    Helpers,
}