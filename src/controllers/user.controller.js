const {User, validate} = require('../models/user.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, hashPassword } = require('../utils/methods.util');
const {EUserType} = require('../enums');


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
        req.body.userType = EUserType.ADMIN;

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
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND'));  

        // user.d = 'dsfa';
        // user.d = 'dsfa';
        // user.d = 'dsfa';
        // user.d = 'dsfa';

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



//  router.put("/upload-image/:id", [uploadUserProfile.single('profile')],  async (req, res) => {
//     try {
//         if (!req.file) return res.status(400).send(API_RESPONSE(false, 'File not found', null, 404));

//         const updated = await User.findByIdAndUpdate(req.params.id, { profile: req.file.path }, { new: true });
//         if (!updated) return res.status(500).send(API_RESPONSE(false, 'User profile not updated', null, 500));
//         return res.status(201).send(updated);

//     } catch (err) {
//         console.log(err);
//         return res.status(500).send(err);
//     }
// });


module.exports = {
    getAll, getById, create, update, deleter
}