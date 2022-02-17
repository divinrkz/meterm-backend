const express = require('express');
const { getAll, create } = require('../controllers/token.controller');
const router = express.Router();


router.get('/api/tokens', getAll);
router.post('/api/tokens', create);
module.exports = router;