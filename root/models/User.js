// importing mongoose
const mongoose = require('mongoose');
const emailValidator = require('../utils/emailValidator');

// schema for user
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required : true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: emailValidator,
            message: props => `${props.value} is not a valid email address!}`
        }
    },
    hashedPassword: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        trim: true,
        validate: {
            validator: (number) => {
                const numberRegex = /^\d{10}$/;
                return numberRegex.test(number);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    wallet: {
        balance: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

// creating model for user
const User = mongoose.model('User', userSchema);

module.exports = User;