const {Token, validate} = require('../models/token.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, validateMeterNumber, validateAmount, getDays, generateToken, validateToken } = require('../utils/common.util');
const { ETokenStatus} = require('../enums');

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

const getByToken = async (req, res) => {
    try {
                  
        if (!validateToken(req.params.token))
            return res.status(400).send(ERROR_RESPONSE('Invalid Token Format', 'VALIDATION ERROR')); 

        const token = await Token.findOne({token: req.params.token});
        if (!token)
            return res.status(404).send(ERROR_RESPONSE('Token not found'));

        return res.status(200).send(SUCCESS_RESPONSE(token));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
}

const getByMeter = async (req, res) => {
    try {
                  
        if (!validateMeterNumber(req.params.meter))
            return res.status(400).send(ERROR_RESPONSE('Invalid Meter Number Format', 'VALIDATION ERROR')); 

        const token = await Token.findOne({meterNumber: parseInt(req.params.meter)});

        if (!token)
            return res.status(404).send(ERROR_RESPONSE('Meter not found'));

        return res.status(200).send(SUCCESS_RESPONSE(token));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
}


const create = async (req, res) => {
    try {
        console.log(req.body);
        const {error} = validate(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 'Validation Error')); 


        if (!validateMeterNumber(req.body.meterNumber))
        return res.status(400).send(ERROR_RESPONSE('Only 6 digits accepted', 'Invalid Meter')); 


        if (!validateAmount(req.body.amount))
             return res.status(400).send(ERROR_RESPONSE('Only multiples of 100 not greater than 182,500 is accepted', 'VALIDATION ERROR')); 
             
  
        let random = generateToken();

        while (await checkToken(random)) {
            random = generateToken();
        };

        const date = new Date();
        const token = new Token({
            token: random,
            meterNumber: parseInt(req.body.meterNumber),
            status: ETokenStatus.USED,
            amount: parseInt(req.body.amount),
            purchaseDate: date,
            expiryDate: date.setDate(date.getDate() + getDays(parseInt(req.body.amount)))
        });

        const saved = await token.save();

        return res.status(200).send(SUCCESS_RESPONSE(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};

const checkToken = async (generated) => {
    return await Token.findOne({token: generated});
}

const checkMeter = async(meterNumber) => {
   return await Token.findOne({meterNumber});
 }

module.exports = {
    getAll, create, getAllByStatus, getByToken, getByMeter
}