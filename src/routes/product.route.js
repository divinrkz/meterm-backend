const express = require('express');
const { getAll, getById, create, update, deleter , getAllByStatus, updateStatus} = require('../controllers/product.controller');
const { AUTH_MIDDLEWARE } = require('../middlewares/auth.middleware');
const router = express.Router();


router.get('/api/products', getAll);
router.get('/api/products/:id', getById);
router.get('/api/products/status/:status', getAllByStatus);
router.post('/api/products', create);
router.put('/api/products/:id', update);
router.put('/api/products/:id/status/:status', updateStatus);
router.delete('/api/products/:id',  deleter);

module.exports = router;