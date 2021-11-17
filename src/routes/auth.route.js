const express = require('express');
const { login, getCurrentUser } = require('../controllers/auth.controller');
const { AUTH_MIDDLEWARE } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/api/auth/current-user', [AUTH_MIDDLEWARE], getCurrentUser);
router.post('/api/auth/login', login);

module.exports = router;