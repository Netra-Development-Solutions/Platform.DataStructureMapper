const error = require("../constants/message/error");

class InvalidCredentialsException extends Error {
    constructor(message) {
        super(message);
        this.name = error.InvalidCredentialsException;
        this.message = message || error.INVALID_CREDENTIALS;
        this.statusCode = 400;
    }
};

class SomethingWentWrongException extends Error {
    constructor(message) {
        super(message);
        this.name = error.SomethingWentWrongException;
        this.message = message || error.SOMETHING_WENT_WRONG;
        this.statusCode = 500;
    }
};

class TokenNotProvidedException extends Error {
    constructor(message) {
        super(message);
        this.name = error.TokenNotProvidedException;
        this.message = message || error.TOKEN_NOT_PROVIDED;
        this.statusCode = 400;
    }
}

class TokenNotValidException extends Error {
    constructor(message) {
        super(message);
        this.name = error.TokenNotValidException;
        this.message = message || error.TOKEN_NOT_VALID;
        this.statusCode = 401;
    }
}

// exporting function
module.exports = {
    InvalidCredentialsException,
    SomethingWentWrongException,
    TokenNotProvidedException,
    TokenNotValidException
};