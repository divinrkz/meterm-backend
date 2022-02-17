const {Product, validate, validateUpdate} = require('../models/product.model');
const { ERROR_RESPONSE, SUCCESS_RESPONSE, hashPassword } = require('../utils/common.util');
const { EProductStatus} = require('../enums');

const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).send(SUCCESS_RESPONSE(products));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};

const getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND')); 

        return res.status(200).send(SUCCESS_RESPONSE(product));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};



const getAllByStatus = async (req, res) => {
    try {
        const products = await Product.find({status: req.params.status});
        return res.status(200).send(SUCCESS_RESPONSE(products));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};



const create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(ERROR_RESPONSE(error.details[0].message, 'VALIDATION ERROR')); 

        const product = new Product(req.body);

        const saved = await product.save();

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


        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND'));  

        product.name = req.body.name;
        product.category = req.body.category;
        product.quantity = req.body.quantity;
        product.owner = req.body.owner;
        product.exportationDate = req.body.exportationDate;
        product.expirationDate = req.body.expirationDate;

        await product.save();

        const updated = await product.save();

        return res.status(200).send(SUCCESS_RESPONSE(updated));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};


const updateStatus = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND'));  

        product.status = req.params.status;

        const updated = await product.save();

        return res.status(200).send(SUCCESS_RESPONSE(updated));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};


const deleter = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send(ERROR_RESPONSE(null, 'NOT FOUND'));  

        const deleted = await Product.findByIdAndDelete(product._id);

        return res.status(200).send(SUCCESS_RESPONSE(null, 'Deleted Successfully'));
    } catch (err) {
        return res.status(500).send(ERROR_RESPONSE(err.toString()));
    } 
};




module.exports = {
    getAll, getById, create, update, deleter, getAllByStatus, updateStatus
}