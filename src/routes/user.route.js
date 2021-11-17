const express = require('express');
const { getAll, getById, create, update, deleter } = require('../controllers/user.controller');
const { AUTH_MIDDLEWARE } = require('../middlewares/auth.middleware');
const router = express.Router();


router.get('/api/users', getAll);
router.get('/api/users/:id', getById);
router.post('/api/users', create);
router.put('/api/users/:id', update);
router.delete('/api/users/:id',  deleter);

module.exports = router;