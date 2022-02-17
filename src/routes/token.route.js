const express = require('express');
const { getAll, create, getByToken, getByMeter } = require('../controllers/token.controller');
const router = express.Router();


router.get('/api/tokens', getAll);
router.get('/api/tokens/by-token/:token', getByToken);
router.get('/api/tokens/by-meter/:meter', getByMeter);
router.post('/api/tokens/purchase', create);

module.exports = router;