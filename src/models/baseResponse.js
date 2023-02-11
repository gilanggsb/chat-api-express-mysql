class BaseResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    static sendResponse = (data, res) => {
        return res.status(data.statusCode).send(data);
    }
    static sendErrorResponse = (data, res) => {
        return res.status(503).send(data);
    }
    static generateResponse = (statusCode, message, data) => {
        return {
            "statusCode": statusCode,
            "message": message || "",
            "data": data || ""
        }
    }
}


module.exports = BaseResponse;
