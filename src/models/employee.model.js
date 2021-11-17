const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const {  EEmployeeAccess, EEmployeeType } = require('../enums');
const { getEnum } = require('../utils/common.util');
const Joi = require('joi');


const employeeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: getEnum(EEmployeeType)
    },
    access: {
        type: String,
        enum: getEnum(EEmployeeAccess),
        default: EEmployeeAccess.PENDING
    }
});
employeeSchema.plugin(timestamps);


const Employee = mongoose.model('Employee', employeeSchema);


const validate = (data) => {
    const schema = {
        names: Joi.string().regex(/(?!^\d+$)^.+$/).required(),
        username: Joi.string().regex(/(?!^\d+$)^.+$/).required(),
        nationalId: Joi.string().min(16).max(16).required(),
        password: Joi.string().min(5).required(),
        role: Joi.string().valid(...getEnum(EEmployeeType)).required()
    }

    return Joi.validate(data, schema);

}


const validateUpdate = (data) => {
    const schema = {
        names: Joi.string().regex(/(?!^\d+$)^.+$/).required(),
        username: Joi.string().regex(/(?!^\d+$)^.+$/).required(),
        nationalId: Joi.string().regex(/(?!^\d+$)^.+$/).min(16).max(16).required(),
        role: Joi.string().valid(...getEnum(EEmployeeType)).required()
    }

    return Joi.validate(data, schema);

}



module.exports = {
    Employee,
    validate,
    validateUpdate
}