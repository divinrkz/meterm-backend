const {User, validate, validateUpdate} = require('../models/user.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, hashPassword } = require('../utils/common.util');
const {EUserType, EUserStatus} = require('../enums');


const getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send(SUCCESS_RESPONSE(users));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};

const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND')); 

        return res.status(200).send(SUCCESS_RESPONSE(user));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};




const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 'VALIDATION ERROR')); 

        req.body.password = await hashPassword(req.body.password);
       
        req.body.status = EUserStatus.ACTIVE;

        const user = new User(req.body);

        const saved = await user.save();

        return res.status(200).send(SUCCESS_RESPONSE(saved));
    } catch (err) {
        console.error(err);
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};


const update = async (req, res) => {
    try {
        const {error} = validateUpdate(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 'VALIDATION ERROR')); 


        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND'));  

        user.names = req.body.names;
        user.username = req.body.username;
        user.nationalId = req.body.nationalId;

        const updated = await user.save();

        return res.status(200).send(SUCCESS_RESPONSE(updated));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};


const deleter = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND'));  

        const deleted = await User.findByIdAndDelete(user._id);

        return res.status(200).send(SUCCESS_RESPONSE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};




module.exports = {
    getAll, getById, create, update, deleter
}