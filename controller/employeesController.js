const data = {
  employees: require('../models/employees.json'),
  setEmployees: function (data) { this.employees = data; }
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    empl => empl.id === parseInt(req.params.id)
  );

  if (!employee)
    return res.status(400).json({
        "message": `Employee ID ${req.params.id} not found`
    });

  res.json(employee);
};

const createNewEmployee = (req, res) => {
  console.log("hello", req.body); // debug output

  if (!req.body.name.first || !req.body.name.last)
    return res.status(400).json({
      'message': "First and last names are required."
    });

  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    name: {
      first: req.body.name.first,
      last: req.body.name.last
    }
  };

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    empl => empl.id === parseInt(req.body.id)
  );

  if (!employee)
    return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });

  if (req.body.name.first)
    employee.name.first = req.body.name.first;
  if (req.body.name.last)
    employee.name.last = req.body.name.last;

  const filteredArray = data.employees.filter(
    empl => empl.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];

  data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    empl => empl.id === parseInt(req.body.id)
  );

  if (!employee)
    return res.status(400).json({
      "message": `Employee ID ${req.body.id} not found`
    });

  const filteredArray = data.employees.filter(
    empl => empl.id !== parseInt(req.body.id)
  );

  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee
};
