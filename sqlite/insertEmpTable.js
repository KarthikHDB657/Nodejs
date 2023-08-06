const sqlite3 = require('sqlite3').verbose();

// Create a new database instance or open an existing one
const db = new sqlite3.Database('database.db');

// Sample data to insert
const employeeDetails = [
    {"empId":1,"empName":"Tiger Nixon","empDesignation":"D","empAge":61,"profile":"Software engineer 1" },
    {"empId":2,"empName":"Garrett Winters","empDesignation":"A","empAge":63,"profile":"Software tester"},
    {"empId":3,"empName":"Ashton Cox","empDesignation":"S","empAge":66,"profile":"Site realibilty engineer"},
    {"empId":4,"empName":"Cedric Kelly","empDesignation":"F","empAge":22,"profile":"cloud engineer"},
    {"empId":5,"empName":"Airi Satou","empDesignation":"B","empAge":33,"profile":"Senior software engineer"}
];

// Individual insert function
const insertEmployee = (employee) => {
    const { empId, empName,empDesignation,empAge,profile } = employee;
    db.run('INSERT INTO employee (empId, empName,empDesignation,empAge,profile) VALUES (?, ?, ?, ?, ?)', [empId, empName,empDesignation,empAge,profile], (err) => {
             if (err) {
               console.error('Error inserting data:', err);
            } else {
              console.log('Employee inserted successfully to the db:', empName);
            }
          });
}

// Call the insertEmployee function for each book in the data array
employeeDetails.forEach((e) => {
  insertEmployee(e);
});

// Close the database connection after all operations are done
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  } else {
    console.log('Database connection closed.');
  }
});
