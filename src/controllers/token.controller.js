const {Token, validate} = require('../models/token.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, validateMeterNumber, validateAmount, generateToken } = require('../utils/common.util');
const { ETokenStatus} = require('../enums');

console.log(generateToken());
const getAll = async (req, res) => {
    try {
        const tokens = await Token.find();
        return res.status(200).send(SUCCESS_RESPONSE(tokens));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};


const getAllByStatus = async (req, res) => {
    try {
        const tokens = await Token.find({status: req.params.status});
        return res.status(200).send(SUCCESS_RESPONSE(tokens));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
}


const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 'VALIDATION ERROR')); 

        if (validateAmount(req.body.amount))
             return res.status(400).send(ERROR_RESPONSE('Invalid Amount', 'VALIDATION ERROR')); 

             
        if (validateMeterNumber(req.body.meterNumber))
        return res.status(400).send(ERROR_RESPONSE('Invalid Meter', 'VALIDATION ERROR')); 

        const random = generateToken();

        const token = new Token(req.body);

        const saved = await token.save();

        return res.status(200).send(SUCCESS_RESPONSE(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};

const checkToken = async (generated) => {
    await Token.findOne({token: generated})
}



module.exports = {
    getAll, create, getAllByStatus
}