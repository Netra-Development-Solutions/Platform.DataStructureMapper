// importing libraries
const { successResponse, errorResponse } = require('../utils/response');
const jwt = require('@netra-development-solutions/utils.crypto.jsonwebtoken');
const User = require('../models/User');
const { TokenNotProvidedException, TokenNotValidException } = require('../exceptions/Base');
const { UserNotFoundException } = require('../exceptions/UserException');

const authenticateUserMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new TokenNotProvidedException();
        }
        
        if (jwt.verify(token)) {
            const decoded = jwt.decode(token);
            
            const user = await User.findById(decoded?._id)
            
            if (user == null || user == undefined || user == '') {
                throw new UserNotFoundException();
            }
            
            req.user = user;
            req.token = token;
            
        } else {
            throw new TokenNotValidException();
        }
        next();
    } catch (error) {
        // responding with unauthorized error
        errorResponse(res, error.message, error.statusCode);
    }
}

module.exports = authenticateUserMiddleware;