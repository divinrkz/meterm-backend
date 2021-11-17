const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { EUserStatus, EUserType } = require('../enums');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const userSchema = mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    nationalId: {
        type: String,
        required: true,
        unique: true
    },
    userType: {
        type: String,
        enum: getEnum(EUserType),
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: getEnum(EUserStatus),
        default: EUserStatus.PENDING
    }
});
userSchema.plugin(timestamps);
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        userType: this.userType,
        status: this.status
    }, SECRET_KEY);
};


const User = mongoose.model('User', userSchema);


const validate = (data) => {
    const schema = {
        names: Joi.string().required(),
        username: Joi.string().required(),
        nationalId: Joi.string().min(16).max(16).required(),
        password: Joi.string().min(5).required()
    }

    return Joi.validate(data, schema);

}


const validateUpdate = (data) => {
    const schema = {
        names: Joi.string().required(),
        username: Joi.string().required(),
        nationalId: Joi.string().min(16).max(16).required()
    }

    return Joi.validate(data, schema);

}

const validateLogin = (data) => {
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    }

    return Joi.validate(data, schema);

}


module.exports = {
    User,
    validate,
    validateLogin,
    validateUpdate
}