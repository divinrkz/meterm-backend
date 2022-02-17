const bcrypt = require('bcryptjs');

const getEnum = (obj) => {
    return Object.keys(obj)
            .map((key) => {
                return obj[key];
            })
}

const SUCCESS_RESPONSE = (data=null, message="", status=200) => {
    return {status: status, success: true, data, message};
}

const ERROR_RESPONSE = (err=null, message="INTERNAL SERVER ERROR", status=500) => {
    return {status: status, success: false, error: err, message};
}

const validateAmount = (amount) => {
    const FIVE_YEAR_AMOUNT = 100 * 365 * 5;
    return (amount >= 100) && (amount <= FIVE_YEAR_AMOUNT) && (amount % 100 == 0);
}

const validateMeterNumber = (meterNumber) => {
    const regex = /^[0-9]{6}$/;
    return regex.test(meterNumber)
}

const validateToken = (token) => {
    const regex = /^[0-9]{8}$/;
    return regex.test(token)
}

const generateToken = () => {
    const len = 8;
    return Math.floor(Math.pow(10, len-1) + Math.random() * (Math.pow(10, len) - Math.pow(10, len-1) - 1));
}



const getDays = (amount) => {
    return (amount / 100);
}


module.exports = {
    getEnum,
    validateAmount,
    generateToken,
    validateToken,
    getDays,
    validateMeterNumber,
    SUCCESS_RESPONSE,
    ERROR_RESPONSE
}