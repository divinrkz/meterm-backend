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


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = {
    getEnum,
    hashPassword,
    SUCCESS_RESPONSE,
    ERROR_RESPONSE
}