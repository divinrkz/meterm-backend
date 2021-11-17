const {User, validateLogin} = require('../models/user.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, hashPassword } = require('../utils/common.util');
const {EUserType, EUserStatus} = require('../enums');
const bcrypt = require('bcryptjs');



const login = async (req, res) => {
    try {
        const {error} = validateLogin(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 'VALIDATION ERROR')); 

        const user = await User.findOne({username: req.body.username, status: EUserStatus.ACTIVE});
        if (!user) return res.status(400).send(ERROR_RESPONSE(null, 'Invalid Credentials')); 

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send(ERROR_RESPONSE(null, 'Invalid Credentials')); 

        const AUTH_USER = {
            _id: user._id,
            token: user.generateAuthToken(),
            userType: user.userType
        };

        return res.status(200).send(SUCCESS_RESPONSE(AUTH_USER));
    } catch (err) {
        console.error(err);
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.AUTH_USER._id);
        return res.status(200).send(SUCCESS_RESPONSE(user));

    } catch (err)  {
        console.error(err);
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    }
};

module.exports = {
    login, getCurrentUser
};