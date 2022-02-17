const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { ETokenStatus } = require('../enums');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');


const tokenSchema = mongoose.Schema({
    meterNumber: {
        type: Number,
        min: 6,
        max: 6,
        required: true
    },
    token: {
        type: Number,
        min: 8, 
        max: 8,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: getEnum(ETokenStatus),
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    },
    purchasedDays: {
        type: Number
    },
    expiryDate: {
        type: Date,
        required: true
    }
});
tokenSchema.plugin(timestamps);


const Token = mongoose.model('Token', tokenSchema);


const validate = (data) => {
    const schema = {
        meterNumber: Joi.number().integer().required(),
        amount: Joi.number().integer().required()
    }

    return Joi.validate(data, schema);
}


module.exports = {
    Token,
    validate,
}