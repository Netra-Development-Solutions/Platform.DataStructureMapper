const error = require("../constants/message/error");

class UserNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = error.UserNotFoundException;
        this.message = message || error.USER_NOT_FOUND;
        this.statusCode = 404;
    }
}

class EmailIsRequiredException extends Error {
    constructor(message) {
        super(message);
        this.name = error.EmailIsRequiredException;
        this.message = message || error.EMAIL_IS_REQUIRED;
        this.statusCode = 400;
    }
}

class EmailIsNotValidException extends Error {
    constructor(message) {
        super(message);
        this.name = error.EmailIsNotValidException;
        this.message = message || error.EMAIL_IS_NOT_VALID;
        this.statusCode = 400;
    }
}

class UserAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = error.UserAlreadyExistsError;
        this.message = message || error.USER_ALREADY_EXISTS;
        this.statusCode = 409;
    }
}

class PasswordIsRequiredException extends Error {
    constructor(message) {
        super(message);
        this.name = error.PasswordIsRequiredException;
        this.message = message || error.PASSWORD_IS_REQUIRED;
        this.statusCode = 400;
    }
}

class UnauthorisedException extends Error {
    constructor(message) {
        super(message);
        this.name = error.UnauthorisedException;
        this.message = message || error.UNAUTHORISED;
        this.statusCode = 401;
    }
}

// exporting function
module.exports = {
    UserNotFoundException,
    UserAlreadyExistsError,
    EmailIsRequiredException,
    EmailIsNotValidException,
    PasswordIsRequiredException,
    UnauthorisedException
};