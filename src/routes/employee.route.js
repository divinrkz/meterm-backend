const express = require('express');
const { getAll, getById, create, update, deleter , getAllByAccess, getAllByRole, updateStatus} = require('../controllers/employee.controller');
const { AUTH_MIDDLEWARE } = require('../middlewares/auth.middleware');
const router = express.Router();


router.get('/api/employees', [AUTH_MIDDLEWARE], getAll);
router.get('/api/employees/:id', getById);
router.get('/api/employees/access/:access', getAllByAccess);
router.get('/api/employees/role/:role', getAllByRole);
router.post('/api/employees', create);
router.put('/api/employees/:id', update);
router.put('/api/employees/:id/access/:access', updateStatus);
router.delete('/api/employees/:id',  deleter);

module.exports = router;