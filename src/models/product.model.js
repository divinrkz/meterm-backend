const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { EProductStatus } = require('../enums');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    exportationDate: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: getEnum(EProductStatus),
        default: EProductStatus.PENDING
    }
});
productSchema.plugin(timestamps);


const Product = mongoose.model('Product', productSchema);


const validate = (data) => {
    const schema = {
        name: Joi.string().required(),
        category: Joi.string().required(),
        owner: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        exportationDate: Joi.date().required(),
        expirationDate: Joi.date().required()
    }

    return Joi.validate(data, schema);

}


const validateUpdate = (data) => {
    const schema = {
        name: Joi.string().required(),
        category: Joi.string().required(),
        owner: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        exportationDate: Joi.date().required(),
        expirationDate: Joi.date().required()
    }

    return Joi.validate(data, schema);

}



module.exports = {
    Product,
    validate,
    validateUpdate
}