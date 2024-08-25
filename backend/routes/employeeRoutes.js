const express = require('express');
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const router = express.Router();

router.get('/employees', getAllEmployees)
.post('/employees', createEmployee)
.put('/employees/:id', updateEmployee)
.delete('/employees/:id', deleteEmployee)


module.exports = router;