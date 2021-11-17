const {User} = require('../models/user.model');
const {Employee, validate, validateUpdate} = require('../models/employee.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, hashPassword } = require('../utils/common.util');
const {EUserType, EUserStatus, EEmployeeAccess, EEmployeeType} = require('../enums');

const POPULATOR = 'user';

const getAll = async (req, res) => {
    try {
        const employees = await Employee.find().populate(POPULATOR);
        return res.status(200).send(SUCCESS_RESPONSE(employees));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};

const getById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate(POPULATOR);
        if (!employee) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND')); 

        return res.status(200).send(SUCCESS_RESPONSE(employee));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};


const getAllByRole = async (req, res) => {
    try {
        const employees = await Employee.find({role: req.params.role}).populate(POPULATOR);
        return res.status(200).send(SUCCESS_RESPONSE(employees));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};



const getAllByAccess = async (req, res) => {
    try {
        const employees = await Employee.find({access: req.params.access}).populate(POPULATOR);
        return res.status(200).send(SUCCESS_RESPONSE(employees));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};



const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 'VALIDATION ERROR')); 

        req.body.password = await hashPassword(req.body.password);
       
        req.body.status = EUserStatus.PENDING;
        req.body.userType = EUserType.EMPLOYEE;

        const user = new User(req.body);

        const savedUser = await user.save();

        const employee = new Employee({
            user: savedUser._id,
            role: req.body.role,
            access: EEmployeeAccess.PENDING
        });

        const savedEmployee = await employee.save();

        return res.status(200).send(SUCCESS_RESPONSE(savedEmployee));
    } catch (err) {
        console.error(err);
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};


const update = async (req, res) => {
    try {
        const {error} = validateUpdate(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 'VALIDATION ERROR')); 


        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND'));  

        const user = await User.findById(employee._user);

        user.names = req.body.names;
        user.username = req.body.username;
        user.nationalId = req.body.nationalId;

        await user.save();

        employee.role = req.body.role;

        const updated = await employee.save();

        return res.status(200).send(SUCCESS_RESPONSE(updated));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};


const updateStatus = async (req, res) => {
    try {

        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND'));  

        const user = await User.findById(employee.user);

        if (req.params.access === EEmployeeAccess.GRANTED) {
            user.status = EUserStatus.ACTIVE;

        }
        if (req.params.access === EEmployeeAccess.DENIED) {
            user.status = EUserStatus.INACTIVE;
        }

        employee.access = req.params.access;

        const updateUser = await user.save();
        const updated = await employee.save();


        return res.status(200).send(SUCCESS_RESPONSE(updated));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};


const deleter = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND'));  

        const deleted = await Employee.findByIdAndDelete(employee._id);

        return res.status(200).send(SUCCESS_RESPONSE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};




module.exports = {
    getAll, getById, create, update, deleter, getAllByAccess, getAllByRole, updateStatus
}