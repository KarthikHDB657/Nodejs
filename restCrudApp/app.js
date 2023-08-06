const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//initializing employeeDetails array
let employeeDetails = [
  {"id":1,"employee_name":"Tiger Nixon","employee_salary":320800,"employee_age":61,"profile":"Software engineer 1" },
  {"id":2,"employee_name":"Garrett Winters","employee_salary":170750,"employee_age":63,"profile":"Software tester"},
  {"id":3,"employee_name":"Ashton Cox","employee_salary":86000,"employee_age":66,"profile":"Site realibilty engineer"},
  {"id":4,"employee_name":"Cedric Kelly","employee_salary":433060,"employee_age":22,"profile":"cloud engineer"},
  {"id":5,"employee_name":"Airi Satou","employee_salary":162700,"employee_age":33,"profile":"Senior software engineer"}
];

// Get all employees
app.get('/employees', (req, res) => {
  res.json(employeeDetails);
});

// Get a employee by ID
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employeeDetails.find((e) => e.id === id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'employee not found in our organisation' });
  }
});

// Create a new employee
app.post('/employees', (req, res) => {
  const { employee_name, employee_salary,employee_age,profile } = req.body;
  const id = employeeDetails.length + 1;
  const newEmployee = { id, employee_name, employee_salary,employee_age,profile };
  employeeDetails.push(newEmployee);
  res.status(201).json(newEmployee,{message:'Employees got added to the new organisation'});
});

// Update a employee
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { employee_name, employee_salary,employee_age,profile } = req.body;
  const empIndex = employeeDetails.findIndex((e) => e.id === id);
  if (empIndex !== -1) {
    employeeDetails[empIndex] = { id, employee_name, employee_salary,employee_age,profile };
    res.json(employeeDetails[empIndex]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Delete a employee
app.delete('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const empIndex = employeeDetails.findIndex((e) => e.id === id);
  if (empIndex !== -1) {
    employeeDetails.splice(empIndex, 1);
    res.json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

//run and tested all the scenarios 
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
