const express = require('express');
const router = express.Router();
const path = require('path');
const {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee
} = require('../../controller/employeesController');

const data = {};
data.employees = require('../../models/employees.json');

router.route('/')
      .get(getAllEmployees)
      .post(createNewEmployee)
      .put(updateEmployee)
      .delete(deleteEmployee);

router.route('/:id')
      .get(getEmployee);

module.exports = router;
