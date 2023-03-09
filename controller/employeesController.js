const data = {};
data.employees = require('../models/employees.json');

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  res.json({ "id": req.body.id });
};

const createNewEmployee = (req, res) => {
  res.json({
    "name": {
      "first": req.body.name.first,
      "last": req.body.name.last
    }
  });
};

const updateEmployee = (req, res) => {
  res.json({
    "name": {
      "first": req.body.name.first,
      "last": req.body.name.last
    }
  });
};

const deleteEmployee = (req, res) => {
  res.json({ "id": req.body.id });
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee
};
